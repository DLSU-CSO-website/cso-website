import { IAnnouncement } from "@/types/announcement.types";
import { model, Model, models, Schema } from "mongoose";

interface AnnouncementModel extends Model<IAnnouncement> {
  createAnnouncement(title: string, body: string, image?: string): Promise<IAnnouncement>
  editAnnouncement(title: string, body: string, id: string, image?: string): Promise<IAnnouncement>
  deleteAnnouncement(id: string): Promise<IAnnouncement>
  viewAnnouncements(): Promise<IAnnouncement[]>
  viewAnnouncementById(id: string): Promise<IAnnouncement>
}

const announcementSchema = new Schema<IAnnouncement, AnnouncementModel>({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
}, { timestamps: true })

announcementSchema.static(
  "createAnnouncement", // IMAGE SHOULD BE UPLOADED AT THIS POINT!
  async function createAnnouncement(title: string, body: string, image?: string) {
    if (!image) {
      image = ""
    }
    const announcement = await this.create({
      title,
      body,
      image
    })
    return announcement
  }
)

announcementSchema.static(
  "editAnnouncement",
  async function editAnnouncement(title: string, body: string, id: string, image?: string) {
    const announcement = await this.findById(id)

    if (!announcement) {
      throw Error("This announcement does not exist")
    }

    announcement.body = body
    announcement.title = title
    if (image) {
      announcement.image = image
    }

    await announcement.save()

    return announcement
  }
)

announcementSchema.static(
  "deleteAnnouncement",
  async function deleteAnnouncement(id: string) {
    const announcement = await this.findByIdAndDelete(id)
    return announcement
  }
)

announcementSchema.static(
  "viewAnnouncements",
  async function viewAnnouncements() {
    const announcements = await this.find()
    return announcements
  }
)

announcementSchema.static(
  "viewAnnouncementById",
  async function viewAnnouncementById(id: string) {
    const announcement = await this.findById(id)
    return announcement
  }
)

const Announcement = model<IAnnouncement, AnnouncementModel>("Announcement", announcementSchema);

export default Announcement
