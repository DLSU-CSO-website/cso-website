"use client";

import Image from "next/image";
import "./homepage-styles.css";
import useFetchData from "@/hooks/useFetchData";
import { IAnnouncement } from "@/types/announcement.types";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";
import { Loader } from "@mantine/core";
import { useState } from "react";
// import { useState } from "react";
// import { IOrganization } from "@/types/organization.types";
// import { ICluster } from "@/types/cluster.types";

const Homepage = () => {
  // data fetching
  const { data: announcements, loading: announcementsLoading } =
    useFetchData("/api/announcements");

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query

  // Filter announcements based on search query
  const filteredAnnouncements = announcements?.filter((announcement: IAnnouncement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="section-layout gradient-background flex-col gap-6">
        <Image
          src="/cso-logo-green.png"
          width={300}
          height={300}
          alt="CSO Logo"
        />
        <button
          className="bg-primary text-secondary inner-box-shadow px-6 py-4 rounded-full"
          onClick={() => scrollToSection("title-section")}
        >
          <p className="text-xl font-semibold uppercase">Explore cso</p>
        </button>
      </section>
      <section
        id="title-section"
        className="section-layout gradient-background-light relative"
      >
        <div className="z-10 w-1/2 flex flex-col justify-center gap-6">
          <p className="scroll-in-animation w-full text-xl uppercase font-bold gradient-text">
            Council of Student Organizations
          </p>
          <h1 className="scroll-in-animation uppercase text-6xl font-bold text-shadow">
            Always for the passion for service
          </h1>
          <hr className="scroll-in-animation w-full border-4 border-primary" />
          <p className="scroll-in-animation w-full text-lg uppercase from-bg gradient-text">
            48 organizations. 9 executive teams. 1 cso
          </p>
        </div>
      </section>
      <section className="w-full min-h-screen p-24 flex flex-col items-center justify-center gradient-background-light gap-16">
      <h1 className="text-5xl uppercase gradient-text font-bold">
          announcements
        </h1>
        <input
          type="text"
          placeholder="Search announcements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-4 border border-gray-300 rounded-lg"
        />
        <div className="w-full flex flex-wrap gap-16 items-center justify-center">
          {announcementsLoading ? (
            <Loader />
          ) : searchQuery ? (
            filteredAnnouncements?.map((announcement: IAnnouncement, key: number) => (
              <AnnouncementHomeCard key={key} announcement={announcement} />
            ))
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

export default Homepage;
