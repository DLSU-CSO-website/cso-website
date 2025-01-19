import { connectDatabase } from "@/libs/mongodb.libs"
import Organizations from "@/models/organizations.models"
import { NextResponse } from "next/server"

export const GET = async (_request: Request) => {
  try {
    connectDatabase()
    const organizations = await Organizations.viewOrganizations()
    return NextResponse.json({ data: organizations, message: "Organizations successfully fetched" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
