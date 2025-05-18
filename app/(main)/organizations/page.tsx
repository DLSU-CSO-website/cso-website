"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import { ICluster } from "@/types/cluster.types";
import { IOrganization } from "@/types/organization.types";

const Clusters = () => {
  const { data: clusters } = useFetchData("/api/organizations");

  const [clusterState, setClusterState] = useState({
    cluster: null as ICluster | null,
    visible: true,
  });

  const [globalSearchQuery, setGlobalSearchQuery] = useState(""); // State for global organization search

  const totalOrganizations =
    clusters?.reduce(
      (sum: number, cluster: ICluster) => sum + cluster.organizations.length,
      0,
    ) || 0;

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

  // Flatten all organizations from all clusters
  const allOrganizations = clusters?.flatMap(
    (cluster: ICluster) => cluster.organizations,
  );

  // Filter organizations based on global search query
  const filteredOrganizations = allOrganizations?.filter(
    (org: IOrganization) =>
      org.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      org.abbreviatedName
        .toLowerCase()
        .includes(globalSearchQuery.toLowerCase()),
  );

  return (
    <main
      id="clusters-section"
      className="w-full min-h-screen p-10 flex flex-col gap-10 gradient-background-light"
    >
      {/* Global Search Input */}
      <input
        type="text"
        placeholder="Search organizations..."
        value={globalSearchQuery}
        onChange={(e) => setGlobalSearchQuery(e.target.value)}
        className="w-full p-2 rounded-md border border-gray-300"
      />
      <div className="w-full h-full md:h-screen flex flex-col md:flex-row items-center justify-center shadow-inner drop-shadow-lg">
        {/* Sidebar for Clusters */}
        <div className="w-full h-full md:w-1/4 p-4 md:p-10 flex flex-col gap-4 gradient-background">
          <div className="w-full flex flex-col gap-1 md:gap-2">
            <h1 className="text-xs md:text-sm text-white font-bold">
              Our Organizations
            </h1>
            <h2 className="text-xs md:text-sm text-secondary font-bold">
              {totalOrganizations} Organizations. 1 CSO
            </h2>
            <hr />
          </div>

          <div className="w-full flex md:flex-col gap-4 overflow-x-scroll no-scrollbar">
            {clusters?.map((cluster: ICluster, key: number) => (
              <div
                key={key}
                className="flex items-center justify-center bg-white/30 md:bg-transparent rounded-md"
              >
                <p
                  className="hidden md:block w-full p-2 text-white font-black text-lg rounded-md cursor-pointer hover:bg-white/40 transition-all duration-70 ease-in-out"
                  onClick={() => handleClusterChange(cluster)}
                >
                  {cluster.fullName}
                </p>
                <p
                  className="w-[110px] flex justify-center md:hidden p-2 text-white font-black text-sm text-center rounded-md cursor-pointer hover:bg-white/40 transition-all duration-70 ease-in-out"
                  onClick={() => handleClusterChange(cluster)}
                >
                  {cluster.abbreviatedName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content for Organizations */}
        <div className="w-full md:w-[75%] h-full p-10 bg-[#F5F5E9] flex flex-col items-center justify-center gap-6">
          <div className="w-4/5 h-full overflow-y-scroll no-scrollbar flex flex-wrap items-center justify-center gap-10">
            {globalSearchQuery ? (
              filteredOrganizations?.length ? (
                filteredOrganizations.map((org: IOrganization, key: number) => (
                  <Link
                    key={key}
                    href={`organizations/${org._id}`}
                    className="cursor-pointer hover:scale-125 transition-all duration-75 ease-in-out"
                  >
                    <Image
                      src={org.logo}
                      width={100}
                      height={100}
                      alt="Org Logo"
                    />
                  </Link>
                ))
              ) : (
                <p className="text-xl font-bold text-gray-500">
                  No organizations found.
                </p>
              )
            ) : clusterState.cluster ? (
              <>
                <div
                  className={`w-4/5 flex flex-wrap items-center justify-center gap-10 transition-opacity duration-300 ${
                    clusterState.visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {clusterState.cluster.organizations.map(
                    (org: IOrganization, key: number) => (
                      <Link
                        key={key}
                        href={`organizations/${org._id}`}
                        className="cursor-pointer hover:scale-125 transition-all duration-75 ease-in-out"
                      >
                        <Image
                          src={org.logo}
                          width={170}
                          height={170}
                          alt="Org Logo"
                        />
                      </Link>
                    ),
                  )}
                </div>
              </>
            ) : (
              <div className="w-4/5 h-full flex flex-col gap-6 items-center justify-center">
                <Image
                  src="/cso-logo-green.png"
                  width={100}
                  height={100}
                  alt="CSO Logo"
                />
                <p className="uppercase font-bold bg-clip-text gradient-text text-3xl">
                  Select an org cluster!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Clusters;
