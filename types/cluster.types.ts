import { Types } from "mongoose"
import { IOrganization } from "./organization.types"

export interface ICluster {
    _id?: Types.ObjectId | string
    abbreviatedName: string;
    fullName: string;
    organizations: IOrganization[];
}