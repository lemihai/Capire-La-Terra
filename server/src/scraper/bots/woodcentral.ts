import { chromium, Page, Locator } from "playwright";
import { collections } from "../../database.js";
import { Article } from "../../models/article.js";
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

// Main function
export async function woodcentralScraper(URL: string, page: any, browser: any) {
  //  trimming the url according to the woodcentral template
  const baseURL = URL.split(".au")[0] + ".au";
  await page.goto(URL);

  //   creating two pages, one for each of the link locators
  let pagesA = await page
    .locator('div[class="tdb-module-title-wrap"]')
    .locator("a")
    .all();
  let pagesB = await page
    .locator('h3[class="entry-title td-module-title"]')
    .locator("a")
    .all();

  // merging the two loactors
  let pages = { ...pagesB, ...pagesA };

  // Iterating through the locators. For each of them, execute the scraping
  Object.entries(pages).forEach(async ([key, article]: [string, any]) => {
    try {
      // Extracting the href of each of the link elements from the main page
      let articleUrl = await article.getAttribute("href");

      // Check if you already scraped this url
      const check = await collections?.articles
        ?.find({ url: articleUrl })
        .toArray();

      // Check if the url exist and check if you scraped it
      if (articleUrl && check?.length === 0) {
        // Execute in this order 1. Create new browser context 2. open new page 3. Go to new page
        const articleContext = await browser.newContext();
        const articlePage = await articleContext.newPage();
        await articlePage.goto(articleUrl);

        //   # retrieving the title, date, author and text of the article
        let articleTitle = await articlePage
          .locator('h1[class="tdb-title-text"]')
          .textContent();
        let articleDate = await articlePage
          .locator('div[class="td-fix-index"]')
          .nth(3)
          .textContent();
        let articleAuthor = await articlePage
          .locator('a[class="tdb-author-name"]')
          .textContent();
        let articleText = await articlePage
          .locator(
            'div[class="td_block_wrap tdb_single_content tdi_151 td-pb-border-top post-content-single td_block_template_1 td-post-content tagdiv-type"]'
          )
          .locator('div[class="tdb-block-inner td-fix-index"]')
          .textContent();

        //   Curating the outputs. Running the auther and the text through the function
        // Splitting the date so it follows the format (day/month/year)
        articleAuthor = await cleanText(articleAuthor);
        articleText = await cleanText(articleText);
        const splitted = articleDate.split("  ");
        articleDate = `${splitted[1]} ${splitted[2]} 20${splitted[3]}`;

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
      // If the url was scanned already, return
      // else return;

      // error handling
    } catch (error) {
      console.log(`${error}`);
    }
  });
}
