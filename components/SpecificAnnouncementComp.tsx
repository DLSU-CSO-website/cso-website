"use client";

import useFetchData from "@/hooks/useFetchData";
import { Loader } from "@mantine/core";
import { Types } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { LuChevronsLeft } from "react-icons/lu";

const SpecificAnnouncementComp = ({ id }: { id: Types.ObjectId | string }) => {
  const { data: announcement, loading } = useFetchData(
    `/api/announcements/${id}`,
  );

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!announcement && !loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Announcement not found</h1>
        <Link
          href="/cso-announcements"
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen p-10 flex flex-col gap-10 gradient-background-light">
      <div className="w-full flex items-center">
        <Link
          href="/cso-announcements"
          className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
        >
          <LuChevronsLeft className="text-2xl" />
          <span className="font-medium">Back to Announcements</span>
        </Link>
      </div>
      <section className="w-full rounded-lg inner-box-shadow">
        <Image
          src={announcement?.image}
          alt="announcement image"
          width={500}
          height={500}
          className="rounded-2xl inner-box-shadow"
        />
      </section>
      <section className="w-full h-[500px] p-10 border-2 border-gray-300 inner-box-shadow rounded-2xl overflow-y-scroll">
        <h2 className="text-2xl font-bold mb-4">{announcement?.title}</h2>
        <p
          className="text-gray-600 text-justify"
          dangerouslySetInnerHTML={{ __html: announcement?.body }}
        ></p>
      </section>
    </main>
  );
};

export default SpecificAnnouncementComp;
