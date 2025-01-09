"use client";

import Image from "next/image";
import "./homepage-styles.css";
import useFetchData from "@/hooks/useFetchData";
import { IAnnouncement } from "@/types/announcement.types";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";
import { Loader } from "@mantine/core";

const Homepage = () => {
  const { data, loading } = useFetchData("/api/announcements");
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <section className="section-layout gradient-background">
        <Image
          src="/cso-logo-green.png"
          width={500}
          height={500}
          alt="CSO Logo"
        />
      </section>
      <section className="section-layout gradient-background-light">
        <div className="w-1/2 flex flex-col justify-center gap-6">
          <p className="w-full text-xl uppercase font-bold gradient-text">
            Council of Student Organizations
          </p>
          <h1 className="w-full text-7xl uppercase font-black gradient-text">
            Always for the passion for service
          </h1>
          <hr className="w-full border-4 border-primary" />
          <p className="w-full text-lg uppercase from-bg gradient-text">
            48 organizations. 9 executive teams. 1 cso
          </p>
        </div>
      </section>
      <section className="section-layout flex flex-col justify-center gradient-background-light gap-10">
        <h1 className="text-5xl uppercase gradient-text font-bold">
          announcements
        </h1>
        <div className="w-full flex gap-6 items-center justify-center">
          {loading ? (
            <Loader />
          ) : (
            data?.map((announcement: IAnnouncement, key: number) => (
              <AnnouncementHomeCard key={key} announcement={announcement} />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Homepage;
