import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { main_scraper } from "../scraper/main";
import { collections } from "../database";

export const articleRouter = Router();
articleRouter.use(cors());

// --------------------------------------
// <|||||||||> Article Routes <|||||||||>
// --------------------------------------

// GET
// returning data from the DB

articleRouter.get("/articles", async (_req, res) => {
  try {
    // storing the result of the call in the articles cosntant
    const articles = await collections?.articles?.find({}).toArray();

    // Handling results and sending it to the front-end
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

articleRouter.get("/scrape", async (_req, res) => {
  try {
    // storing the result of the call in the articles cosntant
    const articles = await collections?.articles?.find({}).toArray();
    const result = "Hello from the server";

    main_scraper();

    // Handling results and sending it to the front-end
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST
// Adding data to the DB

articleRouter.post("/articles", async (req, res) => {
  try {
    // storing the body of the request in the article
    // moreover, storing the result of the insert on the result constant
    // TODO change to adding the articles from the python script
    const article = req.body;
    const result = await collections?.articles?.insertOne(article);
    // result acknowledged is the condition to see if mongodb acknowledged adding the article
    if (result?.acknowledged) {
      res.status(201).send(`Added a new episode: ID ${result.insertedId}`);
    } else {
      res.status(500).send(`Failed to add an articles`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT
// Updating the Article data

// UPDATE 1
articleRouter.put("/articles/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    // Change the req body with the actual update of the article
    const article = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.articles?.updateOne(query, {
      $set: article,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an article: ID ${id}`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`failed to find an article: ID ${id}`);
    } else {
      res.status(304).send(`Failed to upgrade an article: ID ${id}`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE
// Deleting an article

// DELETE 1
articleRouter.delete("/article:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    // Defining the query form the article ID
    const query = { _id: new ObjectId(id) };
    const result = await collections?.articles?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed the article with: ID ${id} `);
    } else if (!result) {
      res.status(400).send(`Failed to remove an article: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an article: ID ${id}`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE ALL

articleRouter.delete("/articles", async (_req, res) => {
  try {
    // this deletes all articles from the database
    const articles = await collections?.articles?.deleteMany({});
  } catch (error) {
    res.status(500).send(error);
  }
});
