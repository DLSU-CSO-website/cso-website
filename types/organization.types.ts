import { Types } from "mongoose";

export interface IOrganization {
  _id?: Types.ObjectId | string;
  abbreviatedName: string;
  name: string;
  orgDesc: string;
  programs?: string;
  facebook?: string;
  instagram?: string;
  logo: string;
}