import * as mongodb from "mongodb";

export interface Episode {
  id: mongodb.ObjectId;
  title: string;
  about: string;
  date: string;
  number: number;
  season: number;
  sources: string[];
  transcript: string;
  episode: string;
}
