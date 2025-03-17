import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="z-40 top-0 sticky w-full h-fit px-6 py-4 bg-primary/80 backdrop-blur drop-shadow-md flex items-center justify-between">
      <div>
        <Image src="/cso-logo-green.png" width={50} height={50} alt="logo" />
      </div>
      <div className="w-fit flex items-center gap-10">
        {pagesRoute.map((page, key: number) => (
          <Link
            href={`${page.route}`}
            key={key}
            className="text-secondary uppercase font-semibold cursor-pointer"
          >
            {page.pageName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
