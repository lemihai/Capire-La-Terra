import { Router, Request, Response, RequestHandler } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { verifyToken } from "./auth.middleware.js";
import { scryptSync, randomBytes } from "node:crypto";

export const userRouter = Router();
userRouter.use(cors());
const JWT_SECRET = process.env.JWT_SECRET;

const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
};

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

userRouter.get("/users/:id", (async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).send("Invalid ID");
      return;
    }

    const query = { _id: new ObjectId(id) };
    const user = await collections?.users?.findOne(query);

    if (user) {
      // Security: Remove password from the response before sending it to frontend
      const { password, ...userWithoutPassword } = user;
      res.status(200).send(userWithoutPassword);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}) as RequestHandler);

// POST

// PUT

userRouter.put("/users/:id", (async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const { name, email, profilePic } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID", success: false });
      return;
    }

    const query = { _id: new ObjectId(id) };
    // Constructing the update object dynamically
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profilePic) updateData.profilePic = profilePic;

    const result = await collections?.users?.updateOne(query, {
      $set: updateData,
    });

    if (result && result.matchedCount) {
      res
        .status(200)
        .json({ message: "Profile updated successfully", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}) as RequestHandler);

// PATCH
userRouter.patch("/users/:id", (async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const { password } = req.body;

    if (!password || password.length < 6) {
      res.status(400).json({ message: "Password too short", success: false });
      return;
    }

    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID", success: false });
      return;
    }

    const securePassword = hashPassword(password); // Using your helper function
    const query = { _id: new ObjectId(id) };

    const result = await collections?.users?.updateOne(query, {
      $set: { password: securePassword },
    });

    if (result && result.matchedCount) {
      res.status(200).json({ message: "Password updated", success: true });
    } else {
      res.status(404).json({ message: "User not found", success: false });
    }
  } catch (error) {
    res.status(400).send(error);
  }
}) as RequestHandler);

// DELETE
