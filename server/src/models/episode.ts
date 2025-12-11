import * as mongodb from "mongodb";

export interface Episode {
  id: mongodb.ObjectId;
  title: string;
  about: string[];
  author: string;
  date: string;
  number: number;
  season: number;
  imageUrl: string;
  audioUrl: string;
  sources: string[];
  transcript: string;
  posted: boolean;
}
