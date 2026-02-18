import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { main_scraper } from "../scraper/main.js";
import { verifyToken } from "./auth.middleware.js";

export const newsWebsitesRouter = Router();
newsWebsitesRouter.use(cors());

// --------------------------------------
// <|||||||||> News Routes <|||||||||>
// --------------------------------------

// GET
// returning data from the DB

newsWebsitesRouter.get("/newsWebsites", verifyToken, async (_req, res) => {
  try {
    const newsWebsites = await collections?.newsWebsites?.find({}).toArray();

    res.status(200).send(newsWebsites);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST
// Adding data to the DB

newsWebsitesRouter.post("/newsWebsites:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid ID parameter",
        success: false,
      });
    }

    const newsWebsite = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.newsWebsites?.insertOne(newsWebsite);

    if (result?.acknowledged) {
      res.status(201).send(`Added a new news website: ID ${result.insertedId}`);
    } else {
      res.status(500).send(`Failed to add a news website`);
    }
  } catch (error) {
    res.send(400).send(error);
  }
});

// PUT

newsWebsitesRouter.put("/newsWebsites:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid ID parameter",
        success: false,
      });
    }

    const newsWebsite = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.newsWebsites?.updateOne(query, {
      $set: newsWebsite,
    });
    if (result && result.matchedCount) {
      res.status(200).send(`Updated the news website: ID ${id}`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`failed to find a website: ID`);
    } else {
      res.status(304).send(`Failed to add a news website: ID ${id}`);
    }
  } catch (error) {
    res.send(400).send(error);
  }
});

// DELETE

newsWebsitesRouter.delete("/newsWebsites:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;

    if (typeof id !== "string") {
      return res.status(400).json({
        message: "Invalid ID parameter",
        success: false,
      });
    }

    const query = { _id: new ObjectId(id) };
    const result = await collections?.newsWebsites?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed the news website with: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a news website: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(400).send(`Failed to find a news webiste with the ID : ${id}`);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
