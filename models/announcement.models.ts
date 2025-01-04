import { IAdmin } from "@/types/admin.types";
import { IAnnouncement } from "@/types/announcement.types";
import { model, Model, Schema } from "mongoose";

interface AnnouncementModel extends Model<IAnnouncement> {
  // TODOS: CRUD ANNOUNCEMENTS
  createAnnouncement(title: string, body: string, image?: string): Promise<IAnnouncement>
  editAnnouncement(title: string, body: string, id: string, image?: string): Promise<IAnnouncement>
  deleteAnnouncement(title: string, body: string, id: string, image?: string): Promise<IAnnouncement>
  viewAnnouncements(): Promise<IAnnouncement>
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
    //TODO
  }
)

announcementSchema.static(
  "deleteAnnouncement",
  async function deleteAnnouncement(title: string, body: string, id: string, image?: string) {
    //TODO
  }
)

announcementSchema.static(
  "viewAnnouncements",
  async function viewAnnouncements() {
    //TODO
  }
)

announcementSchema.static(
  "viewAnnouncementById",
  async function viewAnnouncementById(id: string) {
    //TODO
  }
)

const Announcement = model<IAnnouncement, AnnouncementModel>("Announcement", announcementSchema)

export default Announcement
