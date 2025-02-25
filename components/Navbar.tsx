import Image from "next/image";

const Navbar = () => {
  const pages: Array<string> = [
    "Home",
    "About",
    "Annual Activities",
    "Organizations Specific",
  ];

  return (
    <div className="w-full h-fit px-6 py-4 bg-primary drop-shadow-md flex items-center justify-between">
      <div>
        <Image src="/cso-logo-green.png" width={50} height={50} alt="logo" />
      </div>
      <div className="w-fit flex items-center gap-10">
        {pages.map((page) => (
          <a key={page} className="text-secondary uppercase font-semibold">
            {page}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
