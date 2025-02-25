"use client";

import Image from "next/image";
import "./homepage-styles.css";
import useFetchData from "@/hooks/useFetchData";
import { IAnnouncement } from "@/types/announcement.types";
import AnnouncementHomeCard from "@/components/AnnouncementHomeCard";
import { Loader } from "@mantine/core";
import { useState } from "react";

const Homepage = () => {
  const { data, loading } = useFetchData("/api/announcements");
  const organizations = [
    { name: "Alliance of Science Organizations", images: "image set 1" },
    {
      name: "College of Liberal Arts Professional Organizations",
      images: "image set 2",
    },
    {
      name: "Enginering Alliance Geared Towards Excellence",
      images: "image set 3",
    },
    {
      name: "Alliance of Special Integrated & Socio-Civic Organizations",
      images: "image set 4",
    },
    {
      name: "Alliance of Professional Organizations of Business and Economics",
      images: "image set 5",
    },
  ];

  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  const selectedOrgImage = organizations.find(
    (org) => org.name === selectedOrg,
  )?.images;

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
      <section className="section-layout p-10 flex justify-center gradient-background-light">
        <div className="w-full flex items-center justify-center shadow-inner drop-shadow-lg">
          <div className="w-[25%] h-screen p-10 gradient-background flex flex-col justify-center gap-10">
            <div className="w-full flex flex-col gap-2">
              <div>
                <h1 className="text-white font-bold">Our Organizations</h1>
                <h2 className="text-secondary font-bold">
                  48 Organizations. 1 CSO
                </h2>
              </div>
              <hr />
            </div>
            <div className="w-full flex flex-col justify-start gap-6">
              {organizations.map((item) => (
                <p
                  key={item.name}
                  className="px-4 py-2 text-white font-semibold rounded-lg cursor-pointer hover:bg-white/60 transition-all ease-in-out duration-300"
                  onMouseEnter={() => setSelectedOrg(item.name)}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="w-[75%] h-screen bg-[#F5F5E9] flex items-center justify-center">
            {selectedOrgImage ? (
              <p>{selectedOrgImage}</p>
            ) : (
              <p>No organization selected</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
