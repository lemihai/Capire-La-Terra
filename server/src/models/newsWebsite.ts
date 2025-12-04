import * as mongodb from "mongodb";

export interface NewsWebsite {
  id: mongodb.ObjectId;
  name: string;
  url: string;
}
