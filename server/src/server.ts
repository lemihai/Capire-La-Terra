import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { router } from "./routes";

// Defining the app and port of the express application

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200", // Allow requests from this origin
  })
);

app.use(express.json());
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
