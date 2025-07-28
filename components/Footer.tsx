"use client";

import useFetchData from "@/hooks/useFetchData";
import { ICluster } from "@/types/cluster.types";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { data: clusters } = useFetchData("/api/organizations");

  return (
    <div className="w-full h-fit bottom-0 p-10 flex flex-col md:flex-row gap-10 items-start justify-evenly bg-white shadow-inner">
      <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
        <Image
          src="/cso-logo-green.png"
          width={80}
          height={80}
          alt="CSO Logo"
        />
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-bold uppercase text-gray-500">Contact Us</h1>
          <div className="bg-clip-text text-transparent gradient-background font-medium text-shadow tracking-wider">
            <p>Email Us: email@gmail.com</p>
            <p>Office Hours: Mon-Sat | 8am-8pm</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0">
        <div className="w-full flex flex-col items-start gap-2 md:gap-4">
          <p className="font-bold uppercase text-gray-500">Organizations</p>
          <div className="flex flex-col bg-clip-text text-transparent gradient-background font-bold text-shadow tracking-wider">
            {clusters?.map((cluster: ICluster, key: number) => (
              <Link
                href="/organizations"
                className="hover:text-primary transition-all duration-70"
                key={key}
              >
                {cluster.abbreviatedName}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2 md:gap-4">
          <h1 className="font-bold uppercase text-gray-500">The Council</h1>
          <div className="flex flex-col bg-clip-text text-transparent gradient-background font-medium text-shadow tracking-wider">
            <Link
              href="/about"
              className="hover:text-primary transition-all duration-70"
            >
              About Us
            </Link>
            <Link
              href="/about/#pertinent-links"
              className="hover:text-primary transition-all duration-70"
            >
              Pertinent Links
            </Link>
            <Link
              href="/about/#org-structure"
              className="hover:text-primary transition-all duration-70"
            >
              Org Structure
            </Link>
            <Link
              href="/annualactivities"
              className="hover:text-primary transition-all duration-70"
            >
              Annual Activities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
