import { IAnnouncement } from "@/types/announcement.types";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";

const AnnouncementHomeCarousel = ({
  announcements,
}: {
  announcements: IAnnouncement[];
}) => {
  console.log(announcements);
  return (
    <Carousel
      slideSize="70%"
      height={200}
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: "center",
      }}
    >
      {announcements.map((announcement: IAnnouncement) => (
        <Carousel.Slide key={announcement._id}>
          <Link
            href={`cso-announcements/${announcement._id}`}
            className="w-full flex "
          >
            <div className="w-full h-full flex gap-6">
              <div className="w-full h-full">
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
                  {new Date(announcement.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
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
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default AnnouncementHomeCarousel;
