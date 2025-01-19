import { Types } from "mongoose"

export interface IOrganization {
  _id?: Types.ObjectId | string
  title: string
  name: string
  bio: string
  cluster: string
  course: string
  image: string
}
