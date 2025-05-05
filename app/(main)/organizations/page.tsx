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
      0
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
    (cluster: ICluster) => cluster.organizations
  );
  
// Filter organizations based on global search query
const filteredOrganizations = allOrganizations?.filter((org: IOrganization) =>
  org.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
  org.abbreviatedName.toLowerCase().includes(globalSearchQuery.toLowerCase())
);

  return (
    <section
      id="clusters-section"
      className="section-layout p-10 flex justify-center gradient-background-light"
    >
      <div className="w-full flex items-center justify-center shadow-inner drop-shadow-lg">
        {/* Sidebar for Clusters */}
        <div className="w-[25%] h-screen p-10 gradient-background flex flex-col justify-center gap-10">
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-white font-bold">Our Organizations</h1>
            <h2 className="text-secondary font-bold">
              {totalOrganizations} Organizations. 1 CSO
            </h2>
            <hr />
          </div>
          {/* Global Search Input */}
          <input
            type="text"
            placeholder="Search organizations..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          />
          <div className="w-full flex flex-col gap-6">
            {clusters?.map((cluster: ICluster, key: number) => (
              <p
                key={key}
                className="w-full p-2 text-white font-black text-lg rounded-md cursor-pointer hover:bg-white/40 transition-all duration-70 ease-in-out"
                onClick={() => handleClusterChange(cluster)}
              >
                {cluster.fullName}
              </p>
            ))}
          </div>
        </div>

        {/* Main Content for Organizations */}
        <div className="w-[75%] h-screen bg-[#F5F5E9] flex flex-col items-center justify-center gap-6">
          <div className="w-4/5 flex flex-wrap items-center justify-center gap-10">
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
                      width={200}
                      height={200}
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
                          width={200}
                          height={200}
                          alt="Org Logo"
                        />
                      </Link>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="w-4/5 flex flex-col items-center">
                <Image
                  src="/cso-logo-green.png"
                  width={400}
                  height={400}
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
    </section>
  );
};

export default Clusters;