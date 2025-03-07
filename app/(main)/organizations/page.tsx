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

  return (
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
            {clusterState.cluster ? (
              clusterState.cluster.organizations.map(
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
                ),
              )
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
