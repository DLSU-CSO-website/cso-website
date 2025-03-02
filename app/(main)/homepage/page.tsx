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

const Homepage = () => {
  // data fetching
  const { data: announcements, loading: announcementsLoading } =
    useFetchData("/api/announcements");
  const { data: clusters, loading: clustersLoading } =
    useFetchData("/api/organizations");

  // const [selectedCluster, setSelectedCluster] = useState<ICluster | null>(null);
  // const [selectedOrg, setSelectedOrg] = useState<IOrganization | null>(null);

  const [clusterState, setClusterState] = useState({
    cluster: null as ICluster | null,
    visible: true,
  });

  const [orgState, setOrgState] = useState({
    org: null as IOrganization | null,
    visible: true,
  });

  const totalOrganizations =
    clusters?.reduce(
      (sum: number, cluster: ICluster) => sum + cluster.organizations.length,
      0,
    ) || 0;

  const [fadeIn, setFadeIn] = useState(false);

  const handleClusterChange = (cluster: ICluster) => {
    // First set visibility to false (triggers fade out)
    setClusterState((prev) => ({ ...prev, visible: false }));

    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      // After the next animation frame, update content
      setTimeout(() => {
        setClusterState({ cluster, visible: true });
      }, 150); // Just enough time for fade out to complete
    });
  };

  const handleOrgChange = (org: IOrganization) => {
    setOrgState((prev) => ({ ...prev, visible: false }));

    requestAnimationFrame(() => {
      setTimeout(() => {
        setOrgState({ org, visible: true });
        scrollToSection("org-section");
      }, 150);
    });
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
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
          {announcementsLoading ? (
            <Loader />
          ) : (
            announcements?.map((announcement: IAnnouncement, key: number) => (
              <AnnouncementHomeCard key={key} announcement={announcement} />
            ))
          )}
        </div>
      </section>
      <section
        id="clusters-section"
        className="section-layout p-10 flex justify-center gradient-background-light"
      >
        <div className="w-full flex items-center justify-center shadow-inner drop-shadow-lg">
          <div className="w-[25%] h-screen p-10 gradient-background flex flex-col justify-center gap-10">
            <div className="w-full flex flex-col gap-2">
              <div>
                <h1 className="text-white font-bold">Our Organizations</h1>
                <h2 className="text-secondary font-bold">
                  {totalOrganizations} Organizations. 1 CSO
                </h2>
              </div>
              <hr />
            </div>
            <div className="w-full flex flex-col gap-6">
              {clusters?.map((cluster: ICluster, key: number) => (
                <p
                  className="w-full p-2 text-white font-black text-lg rounded-md cursor-pointer hover:bg-white/40 transition-all duration-70 ease-in-out"
                  key={key}
                  onClick={() => handleClusterChange(cluster)}
                >
                  {cluster.fullName}
                </p>
              ))}
            </div>
          </div>
          <div className="w-[75%] h-screen bg-[#F5F5E9] flex items-center justify-center">
            <div
              className={`w-4/5 flex flex-wrap items-center justify-center gap-10 transition-opacity duration-300 ${
                clusterState.visible ? "opacity-100" : "opacity-0"
              }`}
            >
              {clusterState.cluster &&
                clusterState.cluster.organizations.map(
                  (org: IOrganization, key: number) => (
                    <div
                      key={key}
                      onClick={() => {
                        handleOrgChange(org);
                        // Scroll after a small delay to ensure content is updated
                        setTimeout(() => scrollToSection("org-section"), 50);
                      }}
                    >
                      <Image
                        src={org.logo}
                        width={200}
                        height={200}
                        alt="Org Logo"
                      />
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>
      </section>
      {orgState.org && (
        <section
          id="org-section"
          className="section-layout p-10 flex justify-center gradient-background-light relative"
        >
          <div
            className={`w-full min-h-screen p-10 bg-white shadow-inner flex items-center justify-center relative transition-opacity duration-300 ${
              orgState.visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Rest of your org section code, using orgState.org instead of selectedOrg */}
            <div className="absolute inset-0 flex justify-center items-center opacity-30">
              <Image
                src={orgState.org.logo}
                width={800}
                height={800}
                alt="Org Logo"
                className="object-contain"
              />
            </div>
            <div className="w-[50%] p-10 flex flex-col items-center justify-center bg-white/50 relative z-10">
              <div className="w-full flex flex-col items-center gap-8">
                <h1 className="text-5xl uppercase font-bold gradient-text text-center">
                  {orgState.org.name}
                </h1>
              </div>
              <div className="w-full h-full p-24">
                <p className="text-2xl text-secondary-30 font-bold text-justify">
                  {orgState.org.orgDesc}
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => scrollToSection("clusters-section")}
            className="absolute z-10 bottom-0 w-full p-10 bg-gradient-to-b from-white/30 to-secondary flex flex-col gap-2 items-center justify-center cursor-pointer font-bold"
          >
            <LuChevronsUp />
            <p>View Organizations</p>
          </div>
        </section>
      )}
    </main>
  );
};

export default Homepage;
