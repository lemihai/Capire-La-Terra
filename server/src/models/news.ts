import * as mongodb from "mongodb";

export interface News {
  id: mongodb.ObjectId;
  name: string;
  url: string;
}
