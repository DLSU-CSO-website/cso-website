import { IAnnouncement } from "@/types/announcement.types";
import Image from "next/image";

export default function AnnouncementHomeCard({
  announcement,
}: {
  announcement: IAnnouncement;
}) {
  return (
    <div className="w-[400px] h-[400px] flex flex-col gap-6">
      <div className="">
        <Image
          src={announcement.image}
          height={300}
          width={300}
          alt="announcement image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-[400px] h-[150px] p-4 inner-box-shadow bg-white rounded-lg flex flex-col gap-2">
        <p className="uppercase text-xs text-black/40 font-semibold">Date</p>
        <div className="flex flex-col">
          <p className="gradient-text-light font-bold">{announcement.title}</p>
          <p className="text-sm truncate text-black/40">{announcement.body}</p>
        </div>
      </div>
    </div>
  );
}
