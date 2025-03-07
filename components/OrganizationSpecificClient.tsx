"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { LuChevronsLeft } from "react-icons/lu";
import { IOrganization } from "@/types/organization.types";
import { Loader } from "@mantine/core";
import useFetchData from "@/hooks/useFetchData";
import { Types } from "mongoose";

export default function OrganizationSpecificClient({
  id,
}: {
  id: Types.ObjectId | string;
}) {
  // Fetch all organizations
  const { data: clusters, loading } = useFetchData("/api/organizations");

  // State to hold the found organization
  const [org, setOrg] = useState<IOrganization | null>(null);

  // Find the organization based on the slug
  useEffect(() => {
    if (clusters) {
      // Search through all clusters to find the organization with matching name
      for (const cluster of clusters) {
        const foundOrg = cluster.organizations.find(
          (organization: IOrganization) => organization._id === id,
        );

        if (foundOrg) {
          setOrg(foundOrg);
          break;
        }
      }
    }
  }, [clusters, id]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If organization not found
  if (!org && !loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Organization not found</h1>
        <Link
          href="/organizations"
          className="mt-4 text-blue-500 hover:underline"
        >
          Back to Organizations
        </Link>
      </div>
    );
  }

  return (
    <section className="section-layout pt-32 pb-10 px-10 flex justify-center gradient-background-light relative">
      {org && (
        <div className="w-full min-h-screen bg-white drop-shadow-md flex items-center justify-center relative">
          {/* Background Organization Logo */}
          <div className="w-1/2 bg-white h-full flex justify-center items-center">
            <Image
              src={org.logo}
              width={600}
              height={600}
              alt="Org Logo"
              className="object-contain"
            />
          </div>
          {/* Organization Info */}
          <div className="w-1/2 min-h-screen px-24 py-10 flex flex-col items-center justify-evenly gradient-background relative">
            <div className="w-full flex flex-col items-center gap-8">
              <h1 className="text-5xl uppercase font-bold text-white text-center">
                {org.name}
              </h1>
            </div>
            <div className="w-full h-full">
              <p className="text-2xl text-white font-bold text-justify">
                {org.orgDesc}
              </p>
            </div>
            <div className="w-full flex items-center justify-end gap-4 text-4xl text-white">
              {(org.facebook || org.instagram) && (
                <>
                  {org.facebook && (
                    <Link href={org.facebook} target="_blank">
                      <FaFacebook />
                    </Link>
                  )}
                  {org.instagram && (
                    <Link href={org.instagram} target="_blank">
                      <FaInstagram />
                    </Link>
                  )}
                </>
              )}
            </div>
            {/* Back to organizations button */}
            <div className="w-full flex justify-center mt-8">
              <Link
                href="/organizations"
                className="flex items-center gap-2 text-white hover:text-primary transition-colors"
              >
                <LuChevronsLeft className="text-2xl" />
                <span className="font-medium">Back to Organizations</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
