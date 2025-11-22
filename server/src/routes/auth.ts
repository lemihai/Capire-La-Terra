import { Router } from "express";
import { ObjectId } from "mongodb";
import cors from "cors";
import { collections } from "../database.js";
import { router } from "../routes.js";

export const logInRouter = Router();

logInRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });

    const checkUser = await collections?.users?.findOne({
      username: `${username}`,
    });
    const checkUserName = checkUser?.username;
    const checkUserPassword = checkUser?.password;

    if (checkUserName === username && checkUserPassword === password) {
      console.log("FUCKING WORKS");
      res.status(200).json({
        success: true,
        message: `Login successful ${checkUser?._id}`,
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
