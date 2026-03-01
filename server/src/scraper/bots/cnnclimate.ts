import { chromium, Page, Locator } from "playwright";
import { collections } from "../../database.js";
import { Article } from "../../models/article.js";
import * as mongoDB from "mongodb";
import { networkInterfaces } from "os";
import { News } from "../../models/news.js";

// This async function is cleaning the texts from polluted output like
async function cleanText(input: string) {
  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, "");

  // Remove CSS styles and inline scripts
  const withoutStylesScripts = withoutTags.replace(
    /(\.pp-[^{]+{[^}]*})|(\s*\.[^ ]+\s*{[^}]*})|(\s*{[^}]*})/g,
    "",
  );

  // Remove extra whitespace, newlines, and tabs
  const withoutExtraWhitespace = withoutStylesScripts
    .replace(/\s+/g, " ")
    .trim();

  // return curated string
  return withoutExtraWhitespace;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function parseDate(input: string) {
  // Parse the date
  const l = new Date(input);

  // Extract components
  const year = l.getFullYear(); // Gets the year
  const month = l.getMonth(); // Gets the month (0-based, so add 1)
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

  if (pages.length < 1) {
    const result = await collections.newsWebsites?.updateOne(
      { url: `${URL}` },
      {
        $set: { status: "inactive" },
      },
    );
  }
  //   console.log(typeof pages[0], pages[0]);
  for (const article of pages) {
    try {
      //   Extracting the href of each of the link elements from the main page
      let articleUrl = await article.getAttribute("href");
      articleUrl = baseURL + articleUrl;

      const check = await collections?.news?.findOne({ url: articleUrl });

      if (check) {
        console.log("article not added");
      } else if (check == null || undefined) {
        console.log("article added");
      }

      // Check if the url exist and check if you scraped it
      if ((articleUrl && check == null) || undefined) {
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
        const newArticle: News = {
          _id: new mongoDB.ObjectId(),
          url: articleUrl,
          title: articleTitle,
          date: articleDate,
          author: articleAuthor,
          text: articleText,
          summary: "none",
        };

        const randomDelay = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        await delay(randomDelay);

        // insert the newArticle in the articles collection
        const result = await collections?.news?.insertOne(newArticle);

        // check if the result was succesfull and console log the isnerted ID. Else say that it was not successfull
        if (result?.acknowledged) {
          await collections.newsWebsites?.updateOne(
            { url: `${URL}` },
            {
              $set: { status: "active" },
            },
          );
          console.log("Article added succesfully", result.insertedId);
        } else {
          await collections.newsWebsites?.updateOne(
            { url: `${URL}` },
            {
              $set: { status: "inactive" },
            },
          );
          console.log(`Article was not succesfully added`);
        }

        // close the article page
        await articlePage.close();
      }
    } catch (error) {
      await collections.newsWebsites?.updateOne(
        { url: `${URL}` },
        {
          $set: { status: "inactive" },
        },
      );
      console.log(`${error}`);
    }
  }
}
