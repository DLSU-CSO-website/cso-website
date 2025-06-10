"use client";

import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Loader } from "@mantine/core";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";
import { IAnnouncement } from "@/types/announcement.types";

const Announcements = () => {
  const { data: announcements, loading: announcementsLoading } =
    useFetchData("/api/announcements");
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // Filter announcements based on search query
  const filteredAnnouncements = announcements?.filter(
    (announcement: IAnnouncement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <main className="w-full min-h-screen p-10 gradient-background-light">
      <section className="w-full flex flex-col items-center justify-center gap-10">
        <h1 className="mt-16 text-3xl md:text-5xl uppercase gradient-text font-bold">
          announcements
        </h1>
        <input
          type="text"
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg"
        />

        <div className="w-full md:w-[70%] flex flex-col md:flex-row md:flex-wrap gap-16 items-center justify-between">
          {announcementsLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader color="green" type="bars" size={"xl"} />
            </div>
          ) : searchQuery ? (
            filteredAnnouncements?.map(
              (announcement: IAnnouncement, key: number) => (
                <AnnouncementHomeCard key={key} announcement={announcement} />
              ),
            )
          ) : (
            announcements?.map((announcement: IAnnouncement, key: number) => (
              <AnnouncementHomeCard key={key} announcement={announcement} />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Announcements;
