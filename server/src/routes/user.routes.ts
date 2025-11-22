import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";

export const userRouter = Router();
userRouter.use(cors());

// --------------------------------------
// <|||||||||> User Routes <|||||||||>
// --------------------------------------

// GET

userRouter.get("/users", async (_req, res) => {
  try {
    const users = await collections?.users?.find({}).toArray();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST

// PUT

// DELETE
