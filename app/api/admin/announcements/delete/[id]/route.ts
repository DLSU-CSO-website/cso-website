import { connectDatabase } from "@/libs/mongodb.libs"
import Announcement from "@/models/announcement.models"
import { NextResponse } from "next/server"

export const DELETE = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    connectDatabase()
    const deletedAnnouncement = await Announcement.deleteAnnouncement(id)
    return NextResponse.json({ deleted: deletedAnnouncement, message: "Announcement successfully deleted!" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
