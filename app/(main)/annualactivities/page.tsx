import { getAnnualActivities } from "@/libs/contentful/services/aa.services";
import Image from "next/image";
import Link from "next/link";

export default async function AnnualActivities() {
  const annualActivities = await getAnnualActivities();

  return (
    <main className="w-full min-h-screen p-10 md:p-32 flex flex-col items-center justify-center gap-10 md:gap-6 gradient-background-light">
      <div className="w-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl md:text-5xl font-bold uppercase gradient-text">
          Annual Activities
        </h1>
        <div className="w-full h-23 gradient-background p-1 drop-shadow-lg"></div>
      </div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 items-center justify-items-center">
        {annualActivities?.map((activity) => (
          <Link
            href={`/annualactivities/${activity.title}`}
            key={activity.title}
            className="w-full flex items-center justify-center"
          >
            <div className="w-full flex justify-center items-center p-4">
              {activity.logo &&
                activity.logo.fields.file &&
                activity.logo.fields.file.url && (
                  <Image
                    width={500}
                    height={500}
                    src={`https:${activity.logo.fields.file.url}`}
                    alt={`activity.fields.title}`}
                    className="object-cover"
                  />
                )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
