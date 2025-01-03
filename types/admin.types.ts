import { Types } from "mongoose"

export interface IAdmin {
  _id?: Types.ObjectId | string
  username: string
  password: string
}
