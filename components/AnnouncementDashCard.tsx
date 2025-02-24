import { IAnnouncement } from "@/types/announcement.types";
import { Card, Image } from "@mantine/core";
import Link from "next/link";

export default function AnnouncementDashCard({ announcement }: { announcement: IAnnouncement }) {
  return (
    <Link href={`/secretadmin/dashboard/announcements/${announcement._id}`}>

      <Card shadow="md" radius="md" withBorder className="w-full h-full md:w-72 md:h-96 transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
        <Card.Section className="">
          {
            announcement.image ?
              <>
                <Image
                  src={announcement.image}
                  alt={`${announcement.title} image`}
                />
              </>
              :
              <>

              </>
          }
        </Card.Section>
        <Card.Section className="h-full flex flex-col justify-center items-center p-2 text-center gap-3">
          <span className="w-full md:text-2xl text-lg font-bold">{announcement.title}</span>
          <span className="text-gray-500" dangerouslySetInnerHTML={{ __html: announcement.body.length <= 150 ? announcement.body : `${announcement.body.substring(0, 150)}...` }}></span>
        </Card.Section>
      </Card>
    </Link>
  )
}
