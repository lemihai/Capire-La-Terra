import * as mongodb from "mongodb";

export interface Article {
  // Note yet known
  _id: mongodb.ObjectId;
  title: string;
  date: string;
  author: string;
  text: string;
  sources: string[];
  summary: string;
}
