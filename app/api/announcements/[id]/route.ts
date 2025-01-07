import { connectDatabase } from "@/libs/mongodb.libs"
import Announcement from "@/models/announcement.models"
import { NextResponse } from "next/server"

export const GET = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    connectDatabase()
    const { id } = await params
    const announcement = await Announcement.viewAnnouncementById(id)
    return NextResponse.json({ announcement, message: "Succesfully fetched" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
