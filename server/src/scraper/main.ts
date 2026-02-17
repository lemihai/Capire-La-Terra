import { chromium, Page } from "playwright";
import { newsWebsitesRouter } from "../routes/newsWebsites.routes.js";
import { collections } from "../database.js";
import { ObjectId } from "mongodb";
// function imports
// import * as scrapers from "./bots";
import { aljazeeraScraper } from "./bots/aljazeera.js";
import { woodcentralScraper } from "./bots/woodcentral.js";
import { cleanTechnicaScraper } from "./bots/cleantechnica.js";
import { climatelinksScraper } from "./bots/climatelinks.js";
import { cnnclimateScraper } from "./bots/cnnclimate.js";
import { euronewsScraper } from "./bots/euronews.js";
import { ieaScraper } from "./bots/iea.js";
import { mongabayScraper } from "./bots/mongabay.js";
import { natureClimateChangeScraper } from "./bots/natureclimatechange.js";
import { theguardianScraper } from "./bots/theguardian.js";
import { gristScraper } from "./bots/grist.js";

// Setting up the URL

// Main scraper. This is the parent process that starts the browser
export const main_scraper = async () => {
  // the const browser, context and page are all initializers. The headless should be turned to True once the dev is done
  // const browser = await chromium.launch({ headless: false });
  // const context = await browser.newContext();
  // const page = await context.newPage();
  //   console.log(page);

  // const URLtest = "https://www.aljazeera.com/climate-crisis";
  // await aljazeeraScraper(URLtest, page, browser);
  // const URLtest2 = "https://woodcentral.com.au/category/sustainability/";
  // await woodcentralScraper(URLtest2, page, browser);
  // const URLtest = "https://cleantechnica.com/";
  // await cleanTechnicaScraper(URLtest, page, browser);
  // const URLtest = "https://www.climatelinks.org/blog";
  // await climatelinksScraper(URLtest, page, browser);
  // const URLtest = "https://edition.cnn.com/climate";
  // await cnnclimateScraper(URLtest, page, browser);
  // const URLtest = "https://www.euronews.com/green";
  // await euronewsScraper(URLtest, page, browser);
  // const URLtest = "https://www.iea.org/news";
  // await ieaScraper(URLtest, page, browser);
  // const URLtest = "https://news.mongabay.com/?s=&formats=post+custom_story";
  // await mongabayScraper(URLtest, page, browser);
  // const URLtest = "https://www.nature.com/nclimate/research-articles";
  // await natureClimateChangeScraper(URLtest, page, browser);
  // const URLtest = "https://www.theguardian.com/world";
  // await theguardianScraper(URLtest, page, browser);
  // await browser.close();
  // Intiailizing URL and name variables
  let URL = "";
  let scraperName = "";

  // iterating through the response from the collections and storing the result in an array
  const newsWebsites =
    (await collections?.newsWebsites?.find({})?.toArray()) || [];

  // iterating through each of them
  // TODO: Change the for each to another loop so it works for all of them
  for (const website of newsWebsites) {
    try {
      // TODO: move this to each of the scrapers as this doesn't work
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();

      scraperName = website?.name;
      // Set url one by one
      URL = website?.url;

      // Starts the subprocess of each scraper
      // Each of them needs the URL, the page and the browser in order to open new pages and scrape them
      // const URLtest = "https://www.aljazeera.com/climate-crisis";
      // await aljazeeraScraper(URLtest, page, browser);
      switch (scraperName) {
        case "aljazeera": {
          try {
            await aljazeeraScraper(URL, page, browser);
            // console.log(`Successfully scraped: aljazeera`);

            // 1. Define the query using the string name
            const query = { name: "aljazeera" };

            // 2. Define the update to set the status to 'active' on success
            const result = await collections.newsWebsites?.updateOne(query, {
              $set: { status: "active" },
            });
            // console.log(
            //   `Updated aljazeera status to active. Modified count: ${result}`,
            // );
          } catch (error) {
            console.error(`Error scraping aljazeera:`, error);

            // On failure, set the status to 'inactive'
            const query = { name: "aljazeera" };
            const result = await collections.newsWebsites?.updateOne(query, {
              $set: { status: "inactive" },
            });
            console.log(
              `Updated aljazeera status to inactive due to error. Modified count: ${result}`,
            );
          }
          break;
        }
        case "climatelinks": {
          await climatelinksScraper(URL, page, browser);
          break;
        }
        case "cnnclimate": {
          await cnnclimateScraper(URL, page, browser);
          break;
        }
        case "cleantechnica": {
          await cleanTechnicaScraper(URL, page, browser);
          break;
        }
        case "euronews": {
          await euronewsScraper(URL, page, browser);
          break;
        }
        case "iea": {
          await ieaScraper(URL, page, browser);
          break;
        }
        case "mongabay": {
          await mongabayScraper(URL, page, browser);
          break;
        }
        case "natureclimatechange": {
          await natureClimateChangeScraper(URL, page, browser);
          break;
        }
        // case "theguardian": {
        //   await theguardianScraper(URL, page, browser);
        //   break;
        // }
        case "woodcentral": {
          await woodcentralScraper(URL, page, browser);
          break;
        }
        default:
          console.log(`Scraper for ${scraperName} not available`);
      }

      // let individualScraper = new Function(
      //   `${name}Scraper('${URL}', page, browser)`
      // );
      // await individualScraper();
      // try {
      // } catch (error) {
      //   console.log(`The subprocess stopped with error: ${error}`);
      // }
      // // Function factory
      await page.close();
      await browser.close();
      await context.close();
    } catch (error) {
      console.log(error);
    }
    // close the article page
  }
};
/*
  newsWebsites?.forEach(async (website) => {
    // The name is used for the function factory
    try {
      // TODO: move this to each of the scrapers as this doesn't work
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      console.log("test");

      scraperName = website?.name;
      // Set url one by one
      URL = website?.url;

      // Starts the subprocess of each scraper
      // Each of them needs the URL, the page and the browser in order to open new pages and scrape them
      // const URLtest = "https://www.aljazeera.com/climate-crisis";
      // await aljazeeraScraper(URLtest, page, browser);
      switch (scraperName) {
        case "aljazeera": {
          await aljazeeraScraper(URL, page, browser);

          break;
        }
        case "climatelinks": {
          await climatelinksScraper(URL, page, browser);
          break;
        }
        case "cnnclimate": {
          await cnnclimateScraper(URL, page, browser);
          break;
        }
        case "cleantechnica": {
          await cleanTechnicaScraper(URL, page, browser);
          break;
        }
        case "euronews": {
          await euronewsScraper(URL, page, browser);
          break;
        }
        case "iea": {
          await ieaScraper(URL, page, browser);
          break;
        }
        case "mongabay": {
          await mongabayScraper(URL, page, browser);
          break;
        }
        case "natureclimatechange": {
          await natureClimateChangeScraper(URL, page, browser);
          break;
        }
        // case "theguardian": {
        //   await theguardianScraper(URL, page, browser);
        //   break;
        // }
        case "woodcentral": {
          await woodcentralScraper(URL, page, browser);
          break;
        }
        default:
          console.log(`Scraper for ${scraperName} not available`);
      }

      // let individualScraper = new Function(
      //   `${name}Scraper('${URL}', page, browser)`
      // );
      // await individualScraper();
      // try {
      // } catch (error) {
      //   console.log(`The subprocess stopped with error: ${error}`);
      // }
      // // Function factory
      await page.close();
      await browser.close();
      await context.close();
    } catch (error) {
      console.log(error);
    }
    // close the article page
  }, 100000);
  //   await woodcentralScraper(URL, page, browser);

  //   Close the browser once the job is done
};
*/

// 1. Create the helper function
export const scrapeSingleWebsite = async (website: string) => {
  let URL = "";
  try {
    const newsWebsite = await collections?.newsWebsites
      ?.find({ name: website })
      ?.toArray();

    if (!newsWebsite) {
      return;
    }

    URL = newsWebsite[0].url;

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // /*
    switch (website) {
      case "aljazeera": {
        const query = { name: "aljazeera" };
        try {
          await aljazeeraScraper(URL, page, browser);
          // console.log(`Successfully scraped: aljazeera`);

          // 1. Define the query using the string name

          // 2. Define the update to set the status to 'active' on success
          const result = await collections.newsWebsites?.updateOne(query, {
            $set: { status: "active" },
          });
          // console.log(
          //   `Updated aljazeera status to active. Modified count: ${result}`,
          // );
        } catch (error) {
          console.error(`Error scraping aljazeera:`, error);

          // On failure, set the status to 'inactive'

          const result = await collections.newsWebsites?.updateOne(query, {
            $set: { status: "inactive" },
          });

          // console.log(
          //   `Updated aljazeera status to inactive due to error. Modified count: ${result}`,
          // );
        }
        break;
      }
      case "climatelinks": {
        await climatelinksScraper(URL, page, browser);
        break;
      }
      case "cnnclimate": {
        await cnnclimateScraper(URL, page, browser);
        break;
      }
      case "cleantechnica": {
        await cleanTechnicaScraper(URL, page, browser);
        break;
      }
      case "euronews": {
        await euronewsScraper(URL, page, browser);
        break;
      }
      case "iea": {
        await ieaScraper(URL, page, browser);
        break;
      }
      case "mongabay": {
        await mongabayScraper(URL, page, browser);
        break;
      }
      case "natureclimatechange": {
        await natureClimateChangeScraper(URL, page, browser);
        break;
      }
      // case "theguardian": {
      //   await theguardianScraper(URL, page, browser);
      //   break;
      // }
      case "woodcentral": {
        await woodcentralScraper(URL, page, browser);
        break;
      }
      default:
        console.log(`Scraper for ${website} not available`);
    }

    await page.close();
    await browser.close();
    await context.close();
    // */
    console.log(newsWebsite);
  } catch (error) {
    console.log(error);
  }
};
// Error handling
main_scraper().catch((error) => {
  console.log(`Error: ${error}`);
});
