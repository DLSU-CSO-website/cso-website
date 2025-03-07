import { getAnnualActivities } from "@/libs/contentful/services/aa.services";
import Image from "next/image";
import Link from "next/link";

export default async function SpecificAnnualActivity({
  params,
}: {
  params: { id: string };
}) {
  const annualActivities = await getAnnualActivities();

  // Find the specific activity by matching the ID from the URL
  const activity = annualActivities?.find((item) => item.sys.id === params.id);

  // If no matching activity is found, show a 404-like message
  if (!activity) {
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Activity Not Found</h1>
      </main>
    );
  }

  const { title, description, logo } = activity.fields;
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

      <Link href="/annualactivities">
        <p>Back to Annual Activities</p>
      </Link>
    </main>
  );
}
