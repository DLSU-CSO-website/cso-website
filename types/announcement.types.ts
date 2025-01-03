import { Types } from "mongoose"

export interface IAnnouncement {
  _id?: Types.ObjectId | string
  title: string
  date: Date
  body: string
  image: string
}
