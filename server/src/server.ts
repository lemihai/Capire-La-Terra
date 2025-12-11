import express from "express";
import cors from "cors"
// const cors = require("cors");
// For default imports from packages that export in ES Modules
// const express = require("express").default;
import { connectToDatabase } from "./database.js";
import { router } from "./routes.js";
import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();


// Defining the app and port of the express application



const app = express();
app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests from this origin
  })
);

app.use(express.json({ limit: '5mb' }));
app.use(router);

connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log(
        `Server running at http://localhost:3000... and connected to the database`
      );
    });
  })
  .catch((error) => console.log(error));

// GET
