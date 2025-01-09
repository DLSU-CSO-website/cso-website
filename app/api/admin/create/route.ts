// import Admin from "@/models/admin.models";
// import { connectDatabase } from "@/libs/mongodb.libs";
// import { NextResponse } from "next/server";
//
// export const POST = async (request: Request) => {
//   const { username, password } = await request.json()
//   connectDatabase()
//   try {
//     const admin = await Admin.createAdmin(username, password)
//     return NextResponse.json({ admin, message: "Admin successfully created!" }, { status: 200 })
//   } catch (e) {
//     const err = e as Error
//     return NextResponse.json({ message: err.message }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    return NextResponse.json({ message: "This is the admin create route" }, { status: 200 })
}