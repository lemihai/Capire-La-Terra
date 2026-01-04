import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { Article } from "../models/article.js";
import { verifyToken } from "./auth.middleware.js";

export const articlesRouter = Router();
articlesRouter.use(cors());

// --------------------------------------
// <|||||||||> Articles Routes <|||||||||>
// --------------------------------------

// GET

articlesRouter.get("/articles", async (_req, res) => {
  try {
    const articles = await collections?.articles?.find({}).toArray();

    res.status(200).send(articles);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    // console.log(message);
    res.status(400).send(message);
  }
});

// GET : BY ID

articlesRouter.get("/articles/:id", async (req, res) => {
   const id = req?.params?.id;
  try {
    const query = { _id: new ObjectId(id) }; // This looks correct for MongoDB

    const article = await collections?.articles?.findOne(query);
    // console.log(article);

    res.status(200).send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST
// Add one episode

articlesRouter.post("/articles", verifyToken, async (req, res) => {
  try {
    const article = req.body;
    delete article._id;
    // console.log(article);
    const result = await collections?.articles?.insertOne(article);

    if (result?.acknowledged) {
      res.status(201).json({
        success: true,
        message: `Added a new article: ID ${result.insertedId}`,
        insertedId: result.insertedId,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to add an article",
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error(message);
    res.status(500).json({
      success: false,
      message: message,
    });
  }
});

// PUT

articlesRouter.put("/articles/:id", verifyToken, (async (req: Request, res: Response) => {
// ^^^ Cast the entire async function to RequestHandler ^^^
  try {
    const id = req?.params?.id;
    // Check if ID is a valid ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Invalid Article ID format: ${id}`,
        success: false,
      });
    }

    // The entire updated article object is in req.body
    const updatedArticle = req.body;
    // Remove the _id from the body to prevent issues when setting the document
    delete updatedArticle._id; 

    const query = { _id: new ObjectId(id) };

    const result = await collections?.articles?.replaceOne(query, updatedArticle);

    if (result && result.matchedCount) {
      res.status(200).json({
        message: `Successfully updated article: ID ${id}`,
        success: true,
      });
    } else if (!result?.matchedCount) {
      res.status(404).json({
        message: `Failed to find an article to update: ID ${id}`,
        success: false,
      });
    } else {
      res.status(304).json({
        message: `Article was found, but not modified: ID ${id}`,
        success: true,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.error(message);
    res.status(500).json({
      success: false,
      message: message,
    });
  }
}) as RequestHandler);

// PATCH
// Partially updating the Article data

articlesRouter.patch("/articles/:id", verifyToken, (async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const { posted } = req.body;
    if (typeof posted !== "boolean") {
      return res.status(400).json({
        message: 'Invalid request body: "posted" must be a boolean',
        success: false,
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: `Invalid Article ID format: ${id}`,
        success: false,
      });
    }

    const query = { _id: new ObjectId(id) };
    const result = await collections?.articles?.updateOne(query, {
      $set: { posted },
    });

    if (result && result.matchedCount) {
      res.status(200).json({
        message: `Updated the posted flag for article: ID ${id}`,
        success: true,
      });
    } else if (!result?.matchedCount) {
      res.status(404).json({
        message: `Failed to find an article: ID ${id}`,
        success: true,
      });
    } else {
      res.status(304).json({
        message: `Failed to update the article: ID ${id}`,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}) as RequestHandler);

// DELETE

articlesRouter.delete("/articles/:id", verifyToken, async (req, res) => {
  try {
    const id = req?.params?.id;

    const query = { _id: new ObjectId(id) };
    const result = await collections?.articles?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).json({
        success: true,
        message: `Successfully removed the article with ID: ${id}`,
      });
    } else if (!result) {
      res.status(400).json({
        success: false,
        message: `Failed to remove an article: ID ${id}`,
      });
    } else if (!result.deletedCount) {
      res.status(404).json({
        success: false,
        message: `Failed to find an article: ID ${id}`,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    // console.log(message);
    res.status(400).send(message);
  }
});

// articlesRouter.delete("/articles/:id", async (req, res) => {
//   try {
//     const id = req?.params?.id;
//     // Defining the query form the article ID
//     const query = { _id: new ObjectId(id) };
//     const result = await collections?.articles?.deleteOne(query);

//     if (result && result.deletedCount) {
//       res.status(202).send(`Removed the article with: ID ${id} `);
//     } else if (!result) {
//       res.status(400).send(`Failed to remove an article: ID ${id}`);
//     } else if (!result.deletedCount) {
//       res.status(404).send(`Failed to find an article: ID ${id}`);
//     }
//     // res.status(202).send(`nom nom  ${id} `);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
