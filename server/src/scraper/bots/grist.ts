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
export async function gristScraper(URL: string, page: any, browser: any) {
  console.log("In progress");
  //   //  trimming the url according to the woodcentral template
  //   const baseURL = URL.split(".org")[0] + ".org";
  //   let pages = "";

  //   try {
  //     await page.goto(URL, { timeout: 1000 });
  //   } catch (error) {
  //     pages = await page.locator('a[class="compact-tease__link"]').all();
  //     //   ...(await page.locator('a[class="tease__link"]').all()),
  //     //   ...(await page.locator('a[class="small-tease__link"]').all()),
  //     //   ...(await page.locator('a[class="large-tease-text__link"]').all()),
  //     //   ...(await page.locator('a[class="hp-cover-story__link"]').all()),

  //     console.log(error);
  //   }

  //   console.log(pages);

  //   Object.entries(pages).forEach(async ([key, article]: [string, any]) => {
  //     try {
  //       //   Extracting the href of each of the link elements from the main page
  //       let articleUrl = await article.getAttribute("href", { timeout: 1000 });
  //       //   articleUrl = baseURL + articleUrl;

  //       // Check if you already scraped this url
  //       // The selector for the pages returns two links. but this is handled by the checker
  //       //   Because the link is scraped once, then the 2nd time it's no scraped because of the condition below
  //       const check = await collections?.articles
  //         ?.find({ url: articleUrl })
  //         .toArray();

  //       console.log(articleUrl);
  //     } catch (error) {
  //       let articleUrl = await article.getAttribute("href");
  //       //   articleUrl = baseURL + articleUrl;

  //       console.log(articleUrl);
  //       console.log(error);
  //     }
  //   });
}
