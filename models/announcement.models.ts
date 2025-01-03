import { IAdmin } from "@/types/admin.types";
import { IAnnouncement } from "@/types/announcement.types";
import { model, Model, Schema } from "mongoose";

interface AnnouncementModel extends Model<IAnnouncement> {
  // TODOS: CRUD ANNOUNCEMENTS
  createAnnouncement(title: string, body: string, image: string): Promise<IAnnouncement>
  editAnnouncement(title: string, body: string, image: string): Promise<IAnnouncement>
  deleteAnnouncement(title: string, body: string, image: string): Promise<IAnnouncement>
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

const Announcement = model<IAnnouncement, AnnouncementModel>("Announcement", announcementSchema)
