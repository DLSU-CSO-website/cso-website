import { IAnnouncement } from "@/types/announcement.types";
import { Card, Image } from "@mantine/core";

export default function AnnouncementDashCard({ announcement }: { announcement: IAnnouncement }) {
  return (
    <Card shadow="md" radius="md" withBorder className="w-full h-full md:w-72 md:h-96 transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
      <Card.Section className="">
        <Image
          src={announcement.image}
          alt={`${announcement.title} image`}
        />
      </Card.Section>
      <Card.Section className="w-full flex flex-col justify-start items-center p-2">
        <span className="w-full md:text-2xl text-lg">{announcement.title}</span>
        <span className="text-gray-500">{announcement.body}</span>
      </Card.Section>
    </Card>
  )
}
