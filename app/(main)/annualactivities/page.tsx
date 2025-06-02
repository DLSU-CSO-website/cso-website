import { getAnnualActivities } from "@/libs/contentful/services/aa.services";
import Image from "next/image";
import Link from "next/link";

export default async function AnnualActivities() {
  const annualActivities = await getAnnualActivities();

  return (
    <main className="w-full min-h-screen p-10 md:p-32 flex flex-col items-center justify-center gap-10 md:gap-6 gradient-background-light">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold uppercase gradient-text">
          Annual Activities
        </h1>
        <hr className="w-full md:w-2/4 border-2 border-primary" />
      </div>
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-2">
        {annualActivities?.map((activity) => (
          <Link
            href={`/annualactivities/${activity.title}`}
            key={activity.title}
            className="w-full flex items-center"
          >
            <div className="w-full flex justify-center items-center">
              {activity.logo &&
                activity.logo.fields.file &&
                activity.logo.fields.file.url && (
                  <Image
                    width={200}
                    height={200}
                    src={`https:${activity.logo.fields.file.url}`}
                    alt={`activity.fields.title}`}
                    className="object-contain"
                  />
                )}
              {/* <h2 className="w-full text-wrap text-center font-semibold ">
               {activity.fields.title}
             </h2> */}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
