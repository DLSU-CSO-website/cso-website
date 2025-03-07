"use client";

import useFetchData from "@/hooks/useFetchData";
import { ICluster } from "@/types/cluster.types";
import Image from "next/image";

const Footer = () => {
  const { data: clusters } = useFetchData("/api/organizations");

  return (
    <div className="w-full h-fit bottom-0 p-10 flex items-start justify-evenly bg-white shadow-inner">
      <div className="flex flex-col items-start gap-4">
        <Image
          src="/cso-logo-green.png"
          width={80}
          height={80}
          alt="CSO Logo"
        />
        <div className="flex flex-col items-start gap-4">
          <h1 className="font-black uppercase text-gray-800">Contact Us</h1>
          <div className="bg-clip-text text-transparent gradient-background font-black">
            <p>Email Us: email@gmail.com</p>
            <p>Office Hours: Mon-Sat | 8am-8pm</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-black uppercase text-gray-800">Organizations</h1>
        <div className="bg-clip-text text-transparent gradient-background font-black">
          {clusters?.map((cluster: ICluster, key: number) => (
            <p className="" key={key}>
              {cluster.abbreviatedName}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <h1 className="font-black uppercase text-gray-800">The Council</h1>
        <div className="bg-clip-text text-transparent gradient-background font-black">
          <p>About Us</p>
          <p>Pertinent Links</p>
          <p>Structure</p>
          <p>Annual Activities</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
