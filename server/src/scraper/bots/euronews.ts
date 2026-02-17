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
export async function euronewsScraper(URL: string, page: any, browser: any) {
  // trimming the url according to the woodcentral template
  const baseURL = URL.split(".com")[0] + ".com";
  await page.goto(URL);

  // locating pages
  let pages = await page
    .locator('div[class="o-site-main--article-with-wallpaper__container"]')
    .locator("article")
    .locator('a[class="m-object__title__link   "]')
    .all();
  
    if (pages.length < 1) {
    const result = await collections.newsWebsites?.updateOne(
      { url: `${URL}` },
      {
        $set: { status: "inactive" },
      },
    );
  }

  for (const article of pages) {
    try {
      //   Extracting the href of each of the link elements from the main page
      let articleUrl = await article.getAttribute("href");
      articleUrl = baseURL + articleUrl;
      //   console.log(articleUrl);

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
        console.log(articleUrl);

        let articleTitle = await articlePage
          .locator('h1[class="c-article-redesign-title"]')
          .first()
          .textContent();
        let articleDate = String(String(articleUrl).split(".com")[1]);
        let articleDateArray = articleDate.split("/");
        articleDate =
          articleDateArray[3] +
          "/" +
          articleDateArray[4] +
          "/" +
          articleDateArray[2];
        let articleAuthor = "not specified";
        if (articleAuthor === "not specified") {
          try {
            articleAuthor = await articlePage
              .locator(
                'div[class="c-article-contributors c-article-contributors--green"]'
              )
              .locator("b")
              .textContent({ timeout: 1000 });
          } catch (error) {
            console.log(error);
          }
        } else if (articleAuthor === "not specified") {
          try {
            articleAuthor = await articlePage
              .locator(
                'div[class="c-article-contributors c-article-contributors--green"]'
              )
              .locator("a")
              .textContent({ timeout: 1000 });
          } catch (error) {
            console.log(error);
          }
        } else if (articleAuthor === "not specified") {
          try {
            articleAuthor = await articlePage
              .locator(
                'div[class="o-article-newsy__main__body u-article-content u-article-grid"]'
              )
              .locator('div[class="c-article-contributors"]')
              .locator("a")
              .textContent({ timeout: 1000 });
          } catch (error) {
            console.log(error);
          }
        }
        let articleText = await articlePage
          .locator(
            'div[class="c-article-content c-article-content--green js-article-content poool-content"]'
          )
          .first()
          .textContent({ timeout: 2000 });
        // let articleText = await articlePage
        //   .locator(
        //     'div[class="c-article-content c-article-content--green js-article-content poool-content"]'
        //   )
        //   .nth(1)
        //   .textContent();

        articleTitle = await cleanText(String(articleTitle));
        articleDate = await cleanText(articleDate);
        articleDate = await parseDate(articleDate);
        articleAuthor = await cleanText(articleAuthor);
        articleText = await cleanText(articleText);

        console.log(
          articleTitle,
          "\n",
          articleDate,
          "\n",
          articleText,
          "\n",
          articleAuthor
        );

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

        // insert the newArticle in the articles collection
        const result = await collections?.news?.insertOne(newArticle);

        // check if the result was succesfull and console log the isnerted ID. Else say that it was not successfull
        if (result?.acknowledged)
          console.log("Article added succesfully", result.insertedId);
        else console.log(`Article was not succesfully added`);

        // close the article page
        await articlePage.close();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
