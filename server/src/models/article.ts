import * as mongodb from "mongodb";

export interface Article {
  _id: mongodb.ObjectId;
  url: string;
  title: string;
  author: string;
  date: string;
  text: string;
  // source: string;
  summary: string;
}
