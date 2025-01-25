import { Types } from "mongoose"

export interface IOrganization {
  _id?: Types.ObjectId | string
  title: string;
  name: string;
  body: string;
  course: string;
  cluster: string;
  image?: string;
}

