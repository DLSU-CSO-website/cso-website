import { Types } from "mongoose";

export interface IAnnouncement {
  _id?: Types.ObjectId | string;
  title: string;
  updatedAt: string;
  body: string;
  image: string;
}
