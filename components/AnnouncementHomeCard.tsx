import { IAnnouncement } from "@/types/announcement.types";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementHomeCard({
  announcement,
}: {
  announcement: IAnnouncement;
}) {
  return (
    <Link href={`cso-announcements/${announcement._id}`}>
      <div className="w-full md:w-[300px] h-[420px] flex flex-col gap-6">
        <div className="w-[300px] h-[200px]">
          <Image
            src={announcement.image}
            height={300}
            width={300}
            alt="announcement image"
            className="w-full h-full object-cover rounded-lg object-center"
          />
        </div>
        <div className="w-full md:w-[300px] h-[200px] p-4 inner-box-shadow bg-white rounded-lg flex flex-col gap-2">
          <p className="uppercase text-xs text-black/40 font-semibold">Date</p>
          <div className="flex flex-col gap-4">
            <div
              className="text-lg gradient-text-light font-bold line-"
              dangerouslySetInnerHTML={{ __html: announcement.title }}
            ></div>
            <div
              className="text-base line-clamp-2 text-black/40"
              dangerouslySetInnerHTML={{ __html: announcement.body }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
