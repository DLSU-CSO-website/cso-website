import { getAnnualActivityByName } from "@/libs/contentful/services/aa.services";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuChevronsLeft } from "react-icons/lu";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const name = (await params).id;

  const aa = await getAnnualActivityByName(decodeURIComponent(name));

  if (!aa) {
    return {
      title: "Council of Student Organizations",
      description:
        "The Council of Student Organizations (CSO) is the union of accredited professional (PROF), special interest (SPIN) and socio-civic organizations of De La Salle University. Since its founding in 1974, the Council has continuously delivered quality student services and has produced outstanding student leaders dedicated to serving and contributing to the Lasallian Community.",
    };
  }

  return {
    title: aa.title,
    description: aa.description,
    openGraph: {
      images: [aa.logo?.fields.file?.url || "/cso-logo-green.png"],
      title: aa.title,
      description: aa.description,
    },
  };
}

export default async function SpecificAnnualActivity({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const activity = await getAnnualActivityByName(decoded);

  // Find the specific activity by matching the ID from the URL

  // If no matching activity is found, show a 404-like message
  if (!activity) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Activity Not Found</h1>
      </main>
    );
  }

  const { title, description, logo } = activity;
  const logoUrl = logo?.fields?.file?.url
    ? `https:${logo.fields.file.url}`
    : "";

  return (
    <main className="w-full min-h-screen p-4 md:p-8 gradient-background-light justify-center">
      <div className="w-full min-h-screen shadow-inner drop-shadow bg-white flex items-start justify-center">
        <div className="w-full h-full items-center flex flex-col">
          <div className="w-full px-8 pt-8 pb-4 md:px-24 md:pt-24 md:pb-16 flex flex-col gap-4 items-center justify-center">
            <h1 className="text-2xl md:text-5xl font-bold uppercase text-shadow gradient-text-light">
              {title}
            </h1>
            <div className="w-full h-23 gradient-background p-1 drop-shadow-lg"></div>
          </div>
          <div className="w-full h-auto px-8 md:px-24 flex flex-col md:flex-row items-center overflow-hidden">
            <div className="w-full md:w-1/2 py-8 md:p-24 flex items-start justify-center">
              <p className="text-lg md:text-2xl text-primary font-bold">
                {description}
              </p>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Image
                src={logoUrl}
                alt={title}
                width={900}
                height={500}
                className="w-full h-full object-contain overflow-y-hidden"
              />
            </div>
          </div>
          <div className="w-full flex px-8 py-24 md:p-24 justify-center md:justify-start">
            <Link
              href="/annualactivities"
              className="w-fit text-primary font-bold flex items-center gap-4 hover:text-secondary-30 hover:scale-105 transition-all duration-100"
            >
              <LuChevronsLeft />
              <p>Back to Annual Activities</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
