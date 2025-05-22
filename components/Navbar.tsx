"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = () => {
  const pagesRoute = [
    {
      pageName: "Home",
      route: "/",
    },
    {
      pageName: "About",
      route: "/about",
    },
    {
      pageName: "Annual Activities",
      route: "/annualactivities",
    },
    {
      pageName: "Organizations",
      route: "/organizations",
    },
  ];

  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <>
      <div className="z-40 top-0 sticky w-full h-fit px-6 py-4 bg-primary/80 backdrop-blur drop-shadow-md flex items-center justify-between">
        <div>
          <Image src="/cso-logo-green.png" width={50} height={50} alt="logo" />
        </div>
        <div className="hidden w-fit md:flex items-center gap-10">
          {pagesRoute.map((page, key: number) => (
            <Link
              href={`${page.route}`}
              key={key}
              className="text-secondary uppercase font-semibold cursor-pointer hover:text-white hover:bg-secondary/80 px-4 py-2 rounded-md transition-all duration-300"
            >
              {page.pageName}
            </Link>
          ))}
        </div>
        <div className="flex w-fit md:hidden items-center gap-10">
          {showNavbar ? (
            <IoMdClose
              onClick={() => setShowNavbar(!showNavbar)}
              className="text-2xl text-white font-bold"
            />
          ) : (
            <IoMdMenu
              onClick={() => setShowNavbar(!showNavbar)}
              className="text-2xl text-white font-bold"
            />
          )}
        </div>
      </div>
      {showNavbar === true && (
        <div className="z-20 fixed w-full min-h-screen p-10 bg-white/80 backdrop-blur flex justify-start">
          <div className="w-full h-full flex flex-col gap-10">
            {pagesRoute.map((page, key) => (
              <Link
                href={page.route}
                key={key}
                className="w-full text-3xl md:text-base text-secondary uppercase font-semibold cursor-pointer hover:text-white hover:bg-secondary/80 px-4 py-2 rounded-md transition-all duration-300"
              >
                {page.pageName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;