import { chromium, Page, Locator } from "playwright";
import { collections } from "../../database";
import { Article } from "../../models/article";
import * as mongoDB from "mongodb";
import { networkInterfaces } from "os";

// This async function is cleaning the texts from polluted output like
async function cleanText(input: string) {
  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, "");

  // Remove CSS styles and inline scripts
  const withoutStylesScripts = withoutTags.replace(
    /(\.pp-[^{]+{[^}]*})|(\s*\.[^ ]+\s*{[^}]*})|(\s*{[^}]*})/g,
    ""
  );

  // Remove extra whitespace, newlines, and tabs
  const withoutExtraWhitespace = withoutStylesScripts
    .replace(/\s+/g, " ")
    .trim();

  // return curated string
  return withoutExtraWhitespace;
}

async function parseDate(input: string) {
  // Parse the date
  const l = new Date(input);

  // Extract components
  const year = l.getFullYear(); // Gets the year
  const month = l.getMonth() + 1; // Gets the month (0-based, so add 1)
  const date = l.getDate(); // Gets the day of the month

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //   for (let i = 1; i++; i <= monthNames.length){
  const month_last = monthNames[month].substring(0, 3);

  // Log the results
  return `${date} ${month_last} ${year}`;
}

// Main function
export async function cnnclimateScraper(URL: string, page: any, browser: any) {
  //  trimming the url according to the woodcentral template
  const baseURL = URL.split(".com")[0] + ".com";
  await page.goto(URL);

  let pages = await page.locator('a[data-link-type="article"]').all();

  console.log(pages);
  //   console.log(typeof pages[0], pages[0]);
  for (const article of pages) {
    try {
      //   Extracting the href of each of the link elements from the main page
      let articleUrl = await article.getAttribute("href");
      articleUrl = baseURL + articleUrl;

      // Check if you already scraped this url
      // The selector for the pages returns two links. but this is handled by the checker
      //   Because the link is scraped once, then the 2nd time it's no scraped because of the condition below
      const check = await collections?.articles
        ?.find({ url: articleUrl })
        .toArray();
      // console.log(check, "///", articleUrl);

      // The problem was that I edited the article URL before and it was read as being already scraped by the script

      if (articleUrl && check?.length === 0) {
        // Execute in this order 1. Create new browser context 2. open new page 3. Go to new page
        const articleContext = await browser.newContext();
        const articlePage = await articleContext.newPage();
        await articlePage.goto(articleUrl);
        // console.log(articleUrl);

        // # retrieving the title, date, author and text of the article
        let articleTitle = await articlePage
          .locator('h1[data-editable="headlineText"]')
          .textContent();
        let articleDate = await articlePage
          .locator('div[class="timestamp vossi-timestamp"]')
          .textContent();

        let articleAuthor = await articlePage
          .locator('div[class="byline__names"]')
          .textContent();
        let articleText = await articlePage
          .locator('div[class="article__content-container"]')
          .textContent();

        articleTitle = await cleanText(String(articleTitle));
        // ---- In this section the Article Date is cleaned before being parsed as cnn has a very weird format for displaying date
        articleDate = await cleanText(String(articleDate));
        articleDate = await articleDate.split(",");
        articleDate = String(`${articleDate[1]} ${articleDate[2]}`);
        articleDate = await parseDate(articleDate);

        articleAuthor = await String(articleAuthor).split(",")[0];
        articleAuthor = await String(articleAuthor).split("By")[1];
        articleAuthor = await cleanText(String(articleAuthor));
        if (articleAuthor === "undefined") {
          articleAuthor = "Author not Specified";
        }
        articleText = await cleanText(String(articleText));

        // console.log(
        //   articleTitle,
        //   "\n",
        //   articleDate,
        //   " // ",
        //   typeof articleDate,
        //   "\n",
        //   articleAuthor,
        //   "\n",
        //   articleText
        // );

        // Creatinga  new article object that follows the Article moldel described in the bakend.
        // keep the summary to none.
        // In the future, the summary should be replaced by an ai script that summarisez the content
        const newArticle: Article = {
          _id: new mongoDB.ObjectId(),
          url: articleUrl,
          title: articleTitle,
          date: articleDate,
          author: articleAuthor,
          text: articleText,
          summary: "none",
        };

        // insert the newArticle in the articles collection
        const result = await collections?.articles?.insertOne(newArticle);

        // check if the result was succesfull and console log the isnerted ID. Else say that it was not successfull
        if (result?.acknowledged)
          console.log("Article added succesfully", result.insertedId);
        else console.log(`Article was not succesfully added`);

        // close the article page
        await articlePage.close();
      }
    } catch (error) {
      console.log(`${error}`);
    }
  }
}
