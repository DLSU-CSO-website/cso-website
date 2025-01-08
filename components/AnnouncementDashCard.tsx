import { IAnnouncement } from "@/types/announcement.types";
import { Card, Image } from "@mantine/core";

export default function AnnouncementDashCard({ announcement }: { announcement: IAnnouncement }) {
  return (
    <Card shadow="md" radius="md" padding="lg" withBorder className="w-72 h-96 transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
      <Card.Section className="h-56">
        <Image
          src={announcement.image}
          radius="md"
          alt={`${announcement.title} image`}
        />
      </Card.Section>
      <div className="w-full h-full flex flex-col justify-start items-center p-5">
        <span className="text-2xl text-center">{announcement.title}</span>
        <span className="text-gray-500">{announcement.body}</span>
      </div>
    </Card>
  )
}
