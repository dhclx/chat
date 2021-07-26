import { ObjectId } from "mongoose";

export interface Message {
  _id: ObjectId
  username: string,
  message: string,
};
