import { IAdmin } from "@/types/admin.types";
import { Model, Schema, model } from "mongoose"
import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

interface AdminModel extends Model<IAdmin> {
  //IMPORTANT: ERASE THE CREATE ADMIN FUNCTION BEFORE DEPLOYMENT. I KEPT IT AS COMMENTED FOR THE MEANTIME

  // createAdmin(username: string, password: string): Promise<IAdmin>
  login(username: string, password: string): Promise<IAdmin>
}


const adminSchema = new Schema<IAdmin, AdminModel>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// adminSchema.static(
//   "createAdmin",
//   async function createAdmin(username: string, password: string) {
//     const salt = await bcrypt.genSalt(12)
//     const hash = await bcrypt.hash(password, salt)
//     const admin = await this.create({ username, password: hash })
//     return admin
//   }
// )

adminSchema.static(
  "login",
  async function login(username: string, password: string) {
    if (!username || !password) {
      throw Error("All fields must be filled!")
    }

    const admin = await this.findOne({ username })

    if (!admin) {
      throw Error("Invalid username!")
    }

    const match = bcrypt.compare(password, admin.password!)

    if (!match) {
      throw Error("Wrong password!")
    }

    return admin
  }
)


const Admin = model<IAdmin, AdminModel>("Admin", adminSchema)

export default Admin
