"use client";

import Image from "next/image";
import "./homepage-styles.css";
import useFetchData from "@/hooks/useFetchData";
import { IAnnouncement } from "@/types/announcement.types";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";
import { Loader } from "@mantine/core";
import { useState } from "react";
import { IOrganization } from "@/types/organization.types";
import { ICluster } from "@/types/cluster.types";
import { LuChevronsUp } from "react-icons/lu";
import { LuChevronsDown } from "react-icons/lu";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
//import { MdOutlineMail } from "react-icons/md";
import Link from "next/link";

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

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <section className="section-layout gradient-background relative">
        <Image
          src="/cso-logo-green.png"
          width={500}
          height={500}
          alt="CSO Logo"
        />
        <div
          onClick={() => scrollToSection("title-section")}
          className="absolute z-10 bottom-0 w-full p-10 bg-gradient-to-b from-white/30 to-white flex flex-col gap-2 items-center justify-center cursor-pointer font-bold"
        >
          <p>Explore</p>
          <LuChevronsDown />
        </div>
      </section>
      <section
        id="title-section"
        className="section-layout gradient-background-light relative"
      >
        {/* <div className="absolute inset-0 flex justify-center items-center">
          <Image
            src="/cso-logo-white.png"
            width={900}
            height={900}
            alt="CSO Logo"
            className="object-contain"
          />
        </div> */}
        <div className="z-10 w-1/2 flex flex-col justify-center gap-6">
          <p className="scroll-in-animation w-full text-xl uppercase font-bold gradient-text">
            Council of Student Organizations
          </p>
          <h1 className="scroll-in-animation w-full text-7xl uppercase font-black gradient-text">
            Always for the passion for service
          </h1>
          <hr className="scroll-in-animation w-full border-4 border-primary" />
          <p className="scroll-in-animation w-full text-lg uppercase from-bg gradient-text">
            48 organizations. 9 executive teams. 1 cso
          </p>
        </div>
      </section>
      <section className="section-layout flex flex-col justify-center gradient-background-light gap-10">
        <h1 className="text-5xl uppercase gradient-text font-bold">
          announcements
        </h1>
        <div className="w-full flex gap-6 items-center justify-center">
          {announcementsLoading ? (
            <Loader />
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
