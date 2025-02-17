import { IAnnouncement } from "@/types/announcement.types";
import { Card, Image } from "@mantine/core";

export default function AnnouncementDashCard({ announcement }: { announcement: IAnnouncement }) {
  return (
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
      <Card.Section className="w-full flex flex-col justify-start items-center p-2">
        <span className="w-full md:text-2xl text-lg text-center">{announcement.title}</span>
        <span className="text-gray-500 text-center">{announcement.body.length <= 100 ? announcement.body : `${announcement.body.substring(0, 100)}...`}</span>
      </Card.Section>
    </Card>
  )
}
