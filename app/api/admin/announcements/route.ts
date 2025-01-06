import Announcement from "@/models/announcement.models";
import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/mongodb.libs";
import { checkAdmin } from "@/libs/authentication.libs";
import cloudinary from "@/libs/cloudinary.libs";
import { uploadImageCloudinary } from "@/libs/imageUploader.libs";
import { UploadApiResponse } from "cloudinary";


export const POST = async (request: Request) => {
  try {
    const data = await request.formData()
    connectDatabase()
    checkAdmin(request)

    if (data.get("image")) {
      const imageFile = data.get("image") as File
      const fileBuffer = await imageFile.arrayBuffer()
      const fileStream = Buffer.from(fileBuffer)

      const result = await uploadImageCloudinary(fileStream) as UploadApiResponse

      if (!result) {
        return NextResponse.json({ message: "Could not upload the photo!" }, { status: 500 })
      }
      const newAnnouncement = await Announcement.createAnnouncement(String(data.get("title")), String(data.get("body")), result.secure_url)
      return NextResponse.json({ announcement: newAnnouncement, message: "New Announcement successfully created!" }, { status: 200 })
    }

    const newAnnouncement = await Announcement.create(String(data.get("title")), String(data.get("body")))
    return NextResponse.json({ announcement: newAnnouncement, message: "New Announcement successfully created!" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({
      message: err.message
    }, { status: 500 })
  }
}

export const PUT = async (request: Request) => {
  // DECIDE PLZ WHETHER TO ACTUALLY DELETE THE IMAGE ONCE AN EDIT IS PUSHED OR KEEP IT IN THE BUCKET
  try {
    const data = await request.formData()
    connectDatabase()
    checkAdmin(request)

    if (data.get("image")) {
      const imageFile = data.get("image") as File
      const fileBuffer = await imageFile.arrayBuffer()
      const fileStream = Buffer.from(fileBuffer)

      const result = await uploadImageCloudinary(fileStream) as UploadApiResponse

      if (!result) {
        return NextResponse.json({ message: "Could not upload the photo!" }, { status: 500 })
      }
      const newAnnouncement = await Announcement.editAnnouncement(String(data.get("title")), String(data.get("body")), String(data.get("id")), result.secure_url)
      return NextResponse.json({ announcement: newAnnouncement, message: String(data.get("title")) + " Announcement successfully edited!" }, { status: 200 })
    }

    const newAnnouncement = await Announcement.editAnnouncement(String(data.get("title")), String(data.get("body")), String(data.get("id")))
    console.log("Editted successfully!")
    return NextResponse.json({ announcement: newAnnouncement, message: String(data.get("title")) + " Announcement successfully edited!" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({
      message: err.message
    }, { status: 500 })
  }
}

