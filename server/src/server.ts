import express from "express";
import cors from "cors";
// const cors = require("cors");
// For default imports from packages that export in ES Modules
// const express = require("express").default;
import { connectToDatabase } from "./database.js";
import { router } from "./routes.js";
import * as dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

// Defining the app and port of the express application

const app = express();
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? "https://capirelaterra.it" 
      : "http://localhost:4200",
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(router);

connectToDatabase()
  .then(() => {
    app.listen(3000, "0.0.0.0", () => {
      console.log("Server running at http://localhost:3000...");
    });
  })
  .catch((error) => console.log(error));

// GET
