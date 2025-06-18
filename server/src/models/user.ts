import * as mongodb from "mongodb";

export interface User {
  id: mongodb.ObjectId;
  name: string;
  age: number;
  // device_binding: string[];
}
