import Admin from "@/models/admin.models";
import { connectDatabase } from "@/libs/mongodb.libs";
import { NextResponse } from "next/server";
import { signToken } from "@/libs/authentication.libs";

export const POST = async (request: Request) => {
  const { username, password } = await request.json()
  connectDatabase()
  try {
    const admin = await Admin.login(username, password)
    const token = signToken(admin._id)

    return NextResponse.json({
      token,
      message: "Login Success! :)"
    })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
