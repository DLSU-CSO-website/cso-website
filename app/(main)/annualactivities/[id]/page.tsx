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
    : null;

  return (
    <main className="w-full h-screen p-8 md:p-32 flex flex-col md:flex-row items-start justify-between gap-6 gradient-background-light">
      <div className="flex-1 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-bold uppercase gradient-text">
            {title}
          </h1>
          <hr className="w-full md:w-2/4 border-2 border-primary" />
        </div>
        <p className="text-lg max-w-2xl">{description}</p>
      </div>
      <div className="flex-1 relative flex md:block items-end justify-end md:h-full">
        {logoUrl && (
          <Image
            width={600}
            height={600}
            src={logoUrl}
            alt={title}
            className="md:absolute md:bottom-0 md:right-0 max-w-full h-auto"
          />
        )}
      </div>
      <div className="w-full flex justify-center mb-10">
        <Link
          href="/annualactivities"
          className="flex items-center gap-2 text-white hover:text-primary transition-colors"
        >
          <LuChevronsLeft className="text-2xl" />
          <span className="font-medium">Back to Annual Activities</span>
        </Link>
      </div>
    </main>
  );
}
