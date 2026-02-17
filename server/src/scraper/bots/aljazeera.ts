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

// Main function
export async function aljazeeraScraper(URL: string, page: any, browser: any) {
  //  trimming the url according to the aljazeera template
  const baseURL = URL.split(".com")[0] + ".com";
  await page.goto(URL);

  // Locating all of the links on the main page
  let pages = await page.locator('a[class="u-clickable-card__link"]').all();

  // creating a for loop that goes through all of the articles found
  /* I used this instead of the object entries approach because the 
  article pages were being closed before the attributes were read as the
  foreach loop is ignoring the async await function.
  
  Keep the for of otherwise it won't work
  */

  if (pages.length < 1) {
    const result = await collections.newsWebsites?.updateOne(
      { url: `${URL}` },
      {
        $set: { status: "inactive" },
      },
    );
  }
  for (const article of pages) {
    // the first part of the for of starts as try.
    try {
      // The same process works as the article URL is built with the main url and the article URL
      let articleUrl = await article.getAttribute("href");
      articleUrl = baseURL + articleUrl;
      // Check if you already scraped this url
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

        // Retrieving the title, date, author and text of the article
        let articleTitle = await articlePage
          .locator("h1")
          .filter({ hasNotText: "AL JAZEERA PODCASTS" })
          .first()
          .textContent({ timeout: 10000 });
        let articleDate = await articlePage
          .locator('div[class="article-dates"]')
          .locator('span[aria-hidden="true"]')
          .textContent();
        // Initialize the article author with missing
        /*
          The try catch starts are there because in the case of the 
          articleAuthor and the articelText is not found as possible in some cases. 
        */
        let articleAuthor = "missing";
        try {
          articleAuthor = await articlePage
            .locator('a[class="tdb-author-name"]')
            // Timout here is used because that's the time it takes ot look for the element
            .textContent({ timeout: 1000 });
        } catch (error) {
          console.log(error);
        }
        let articleText = "missing";
        try {
          articleText = await articlePage
            .locator('div[class="wysiwyg wysiwyg--all-content css-ibbk12"]')
            // Timout here is used because that's the time it takes ot look for the element
            .textContent({ timeout: 1000 });
        } catch (error) {
          console.log(error);
        }

        // Clean the article text
        articleText = await cleanText(articleText);

        // Creating a new article object that follows the Article model described in the backend.
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

        // insert the newArticle in the articles collection
        if (newArticle.text != "missing") {
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
      // Catch the error from the script
      console.log(`${error}`);
    }
  }
}
