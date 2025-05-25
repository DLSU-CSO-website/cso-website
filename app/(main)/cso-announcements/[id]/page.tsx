"use client";

import SpecificAnnouncementComp from "@/components/SpecificAnnouncementComp";
import { useParams } from "next/navigation";

export default function SpecificAnnouncement() {
  const params = useParams();

  if (!params.id) {
    return <main>Cannot find announcement</main>;
  }

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <SpecificAnnouncementComp id={id} />;
}
