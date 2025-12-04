import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";

export const articlesRouter = Router();
articlesRouter.use(cors());

// --------------------------------------
// <|||||||||> Articles Routes <|||||||||>
// --------------------------------------

// GET

articlesRouter.get("/articles", async (_req, res) => {
  try {
    res.status(200).send(`test`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});

// GET : BY ID

articlesRouter.get("/articles/:id", async (req, res) => {
  try {
    res.status(200).send(`test`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});

// POST
// Add one episode
articlesRouter.post("/articles", async (req, res) => {
  try {
    res.status(200).send(`test`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});

// PUT

articlesRouter.put("/articles/:id", async (req, res) => {
  try {
    res.status(200).send(`test`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});

// DELETE

articlesRouter.delete("/articles/:id", async (req, res) => {
  try {
    res.status(200).send(`test`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";
    console.log(message);
    res.status(400).send(message);
  }
});
