"use client";

import { useParams } from "next/navigation";
import useFetchData from "@/hooks/useFetchData";

const SpecificAnnouncement = () => {
  const { slug } = useParams();
  console.log(slug);
  const { data, loading } = useFetchData("/api/announcements/" + slug);
  console.log("here " + data?.body);

  return (
    <main className="w-full min-h-screen p-10 gradient-background-light">
      asasas
    </main>
  );
};

export default SpecificAnnouncement;
