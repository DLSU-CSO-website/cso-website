import { IAnnouncement } from "@/types/announcement.types";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementHomeCard({
  announcement,
}: {
  announcement: IAnnouncement;
}) {
  return (
    <Link href={`cso-announcements/${announcement._id}`} className="">
      <div className="w-[300px] h-[350px] flex flex-col justify-between gap-6">
        <div className="w-full h-1/2">
          <Image
            src={announcement.image}
            height={300}
            width={300}
            alt="announcement image"
            className="w-full h-full object-cover rounded-lg object-center"
          />
        </div>
        <div className="w-full p-4 inner-box-shadow bg-white rounded-lg flex flex-col gap-2">
          <p className="uppercase text-xs text-black/40 font-semibold">
            {new Date(announcement.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
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
