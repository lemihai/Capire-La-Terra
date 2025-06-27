import { Article } from "./models/article";
import { News } from "./models/news";
import { exec } from "child_process";

// Calling the controller, python script
// connect this to a request button on the front-end and call it from a router request.
// connect the db to mongodvb and let it write in the databaes to save articles.

exec("python3 ./scraper/bots/NSB/scraper-controller.py", (error, stdout) => {
  if (error) {
    console.log(`error: ${error.message}`);
  } else {
    console.log(stdout);
  }
});

// TEST

// const jwt = require("jsonwebtoken");
