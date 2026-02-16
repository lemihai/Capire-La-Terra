import { Router, Request, Response, RequestHandler } from "express";
import { collections } from "../database.js";
import jwt from "jsonwebtoken";
import { scryptSync, timingSafeEqual } from "node:crypto";

export const logInRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Define the handler separately to keep the router.post line clean
const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!JWT_SECRET) {
      throw new Error(
        "FATAL: JWT_SECRET environment variable is not configured.",
      );
    }

    const checkUser = await collections?.users?.findOne({ username });

    if (!checkUser || !checkUser.password) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return; // Return void, not the response
    }

    const [salt, storedHash] = checkUser.password.split(":");

    // Safety check for malformed DB entries
    if (!salt || !storedHash) {
      res
      
      .status(500)
      .json({ success: false, message: "Database password format error" });
      return;
    }
    console.log(salt, storedHash);

    const hashToVerify = scryptSync(password, salt, 64).toString("hex");

    const isMatch = timingSafeEqual(
      Buffer.from(storedHash, "hex"),
      Buffer.from(hashToVerify, "hex"),
    );

    if (isMatch) {
      const expiresIn = rememberMe ? "30d" : "1h";
      const payload = {
        userId: checkUser._id.toHexString(),
        username: checkUser.username,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

      res.status(200).json({
        success: true,
        message: `Login successful`,
        token: token,
        userId: checkUser._id.toHexString(),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};

// Use the double-cast (as unknown as RequestHandler) to squash the TS(2352) error
logInRouter.post("/login", loginHandler as unknown as RequestHandler);
