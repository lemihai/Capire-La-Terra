import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { router } from "../routes.js";
import jwt from "jsonwebtoken";

export const logInRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1h";

logInRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });

    const checkUser = await collections?.users?.findOne({
      username: `${username}`,
    });

    const checkUserName = checkUser?.username;
    const checkUserPassword = checkUser?.password;

        if (!JWT_SECRET) {
        // This will stop the server from starting if the secret is missing
        throw new Error("FATAL: JWT_SECRET environment variable is not configured.");
    }

    if (checkUserName === username && checkUserPassword === password) {
      console.log("FUCKING WORKS", JWT_SECRET);

      const payload = {
        userId: checkUser?._id.toHexString(), // Use .toHexString() to ensure it's a string
        username: checkUser?.username,
      };

      const token = jwt.sign(payload, JWT_SECRET!, {
        expiresIn: JWT_EXPIRATION,
      });

      console.log(token);

      res.status(200).json({
        success: true,
        message: `Login successful ${checkUser?._id}`,
        token: token, // Send the token back to the client
        userId: checkUser?._id.toHexString(),
      });
    } else {
      // Failed login
      res.status(401).json({
        success: false,
        message: `Invalid username or password ${checkUser?.password}`,
      });
    }

    // const user = await collections?.users?.find({}).toArray();

    // Check if user exists

    // Check if the password and username is the same

    // Check if the password is correct
  } catch (error) {
    // Server error
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});
