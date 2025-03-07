// [slug]/page.tsx (Server Component)
import OrganizationSpecificClient from "@/components/OrganizationSpecificClient";
import { Types } from "mongoose";

export default function OrganizationSpecificPage({
  params,
}: {
  params: { id: Types.ObjectId | string };
}) {
  // Pass the slug as a prop to the client component
  return <OrganizationSpecificClient id={params.id} />;
}
