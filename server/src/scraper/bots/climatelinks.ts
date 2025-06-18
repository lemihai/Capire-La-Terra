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
export async function climatelinksScraper(
  URL: string,
  page: any,
  browser: any
) {
  //  trimming the url according to the woodcentral template
  const baseURL = URL.split(".org")[0] + ".org";
  await page.goto(URL);

  //   # locator for all the articles found on the main page
  let pages = await page
    .locator("article[role='article']")
    .locator("div[class='image-teaser__content']")
    .locator("a")
    .all();

  //   console.log(pages, URL);
  // Iterating through the locators. For each of them, execute the scraping
  for (const article of pages) {
    try {
      // Extracting the href of each of the link elements from the main page
      let articleUrl = await article.getAttribute("href");

      // Check if you already scraped this url
      const check = await collections?.articles
        ?.find({ url: articleUrl })
        .toArray();
      //   console.log(articleUrl, check);

      if (articleUrl && check?.length === 0) {
        // Execute in this order 1. Create new browser context 2. open new page 3. Go to new page
        const articleContext = await browser.newContext();
        const articlePage = await articleContext.newPage();
        await articlePage.goto(articleUrl);
        // console.log(articleUrl);

        // # gather the title, date, author and article of the article
        let articleTitle = await articlePage
          .locator('h1[class="hero-inline-page__title"]')
          .textContent();
        let articleDate = await articlePage
          .locator('div[class="blog__date"]')
          .textContent();
        let articleAuthor = await articlePage
          .locator('div[class="blog__author"]')
          .textContent();
        let articleText = await articlePage
          .locator("article")
          .locator('div[class="l-section__content"]')
          .nth(2)
          .textContent();

        articleTitle = await cleanText(articleTitle);
        articleDate = await cleanText(articleDate);
        articleDate = await parseDate(articleDate);
        articleAuthor = await cleanText(articleAuthor);
        articleText = await cleanText(articleText);

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
