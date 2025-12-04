// mongoClient
// const { MongoClient } = require("mongodb");
import * as mongoDB from "mongodb";
import { Episode } from "./models/episode.js";
import { Article } from "./models/article.js";
import { NewsWebsite } from "./models/newsWebsite.js";
import { News } from "./models/news.js";
import { User } from "./models/user.js";
// URI is the link to the localhosted database
// Client is a new mongodb client that connects to the URI

export const collections: {
  news?: mongoDB.Collection<News>;
  articles?: mongoDB.Collection<Article>;
  episodes?: mongoDB.Collection<Episode>;
  newsWebsites?: mongoDB.Collection<NewsWebsite>;
  users?: mongoDB.Collection<User>;
} = {};

// news
// articles
// episodes
// newswebsites || ROBOTS
//
// users

// console.log("test");
let dbName = "";

export async function connectToDatabase() {
  // keeping the uri, client and database inside of the function
  // TODO: move them outside of the function in the .env
  const uri = "mongodb://db:27017";
  const client = new mongoDB.MongoClient(uri);
  const database = client.db("capirelaterra");
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await database.command({ ping: 1 });
    console.log(`Nom nom ${database.databaseName}`);
    // Storing the database name
    dbName = database.databaseName;

    // initializing collections
    collections.episodes = database.collection<Episode>("episodes");
    collections.articles = database.collection<Article>("articles");
    collections.newsWebsites = database.collection<NewsWebsite>("newswebsites");
    collections.news = database.collection<News>("news");
    collections.users = database.collection<User>("users");
  } catch (error) {
    // error handling the connect
    console.log("Error connecting to the database: ", error);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
