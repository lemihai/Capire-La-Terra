import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { main_scraper } from "../scraper/main.js";
import { collections } from "../database.js";

export const newsRouter = Router();
newsRouter.use(cors());

// --------------------------------------
// <|||||||||> Article Routes <|||||||||>
// --------------------------------------

// GET
// returning data from the DB

newsRouter.get("/news", async (_req, res) => {
  try {
    // storing the result of the call in the articles cosntant
    // let authorisationToke = _req.headers.authorization;
    console.log(_req.headers.authorization?.split(':')[1]);
    const articles = await collections?.news?.find({}).toArray();
    // console.log(articles);
    // Handling results and sending it to the front-end
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// express/backend route

newsRouter.get("/news/:id", async (_req, res) => {
  const id = _req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) }; // This looks correct for MongoDB

    const article = await collections?.news?.findOne(query);
    // console.log(article);

    res.status(200).send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

newsRouter.get("/scrape", async (_req, res) => {
  try {
    // storing the result of the call in the articles constant
    const articles = await collections?.news?.find({}).toArray();
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

newsRouter.post("/news", async (req, res) => {
  try {
    // storing the body of the request in the article
    // moreover, storing the result of the insert on the result constant
    // TODO change to adding the articles from the python script
    const article = req.body;
    const result = await collections?.news?.insertOne(article);
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
newsRouter.put("/news/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    // Change the req body with the actual update of the article
    const article = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.news?.updateOne(query, {
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

// PATCH


// DELETE
// Deleting an article

// DELETE 1
newsRouter.delete("/news/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    // Defining the query form the article ID
    const query = { _id: new ObjectId(id) };
    const result = await collections?.news?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed the article with: ID ${id} `);
    } else if (!result) {
      res.status(400).send(`Failed to remove an article: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an article: ID ${id}`);
    }
    // res.status(202).send(`nom nom  ${id} `);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE ALL

newsRouter.delete("/news", async (_req, res) => {
  try {
    // this deletes all articles from the database
    const articles = await collections?.news?.deleteMany({});
  } catch (error) {
    res.status(500).send(error);
  }
});
