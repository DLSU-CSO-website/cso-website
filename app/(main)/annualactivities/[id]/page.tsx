import { getAnnualActivityByName } from "@/libs/contentful/services/aa.services";
import { Metadata } from "next";
import Image from "next/image";

type Params = Promise<{ id: string }>

export async function generateMetadata(
  { params }: {
    params: Params
  }): Promise<Metadata> {

  const name = (await params).id

  const aa = await getAnnualActivityByName(decodeURIComponent(name))

  if (!aa) {
    return {
      title: "Council of Student Organizations",
      description: "The Council of Student Organizations (CSO) is the union of accredited professional (PROF), special interest (SPIN) and socio-civic organizations of De La Salle University. Since its founding in 1974, the Council has continuously delivered quality student services and has produced outstanding student leaders dedicated to serving and contributing to the Lasallian Community.",
    }
  }

  return {
    title: aa.title,
    description: aa.description,
    openGraph: {
      images: [aa.logo?.fields.file?.url || '/cso-logo-green.png'],
      title: aa.title,
      description: aa.description
    }
  }
}

export default async function SpecificAnnualActivity({ params }: { params: Params }) {

  const { id } = await params
  const decoded = decodeURIComponent(id)
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
    <main className="w-full min-h-screen p-32 flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">{title}</h1>
      {logoUrl && (
        <Image
          width={300}
          height={300}
          src={logoUrl}
          alt={title}
          className="object-contain"
        />
      )}
      <p className="text-lg max-w-2xl text-center">{description}</p>
    </main>
  );
}
