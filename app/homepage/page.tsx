import Image from "next/image";

const Homepage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gradient-background">
      <Image
        src="/cso-logo-green.png"
        width={500}
        height={500}
        alt="CSO Logo"
      />
    </div>
  );
};

export default Homepage;
