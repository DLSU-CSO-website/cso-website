import { connectDatabase } from "@/libs/mongodb.libs";
import Announcement from "@/models/announcement.models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectDatabase();
    const announcements = await Announcement.getRecentAnnouncements();
    return NextResponse.json(
      { data: announcements, message: "Announcements successfully fetched" },
      { status: 200 },
    );
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
