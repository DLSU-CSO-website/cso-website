"use client";

// [slug]/page.tsx (Server Component)
import OrganizationSpecificClient from "@/components/OrganizationSpecificClient";
import { useParams} from 'next/navigation';

export default function OrganizationSpecificPage() {
  const params = useParams();
  // Ensure params.id exists and is valid
  if (!params?.id) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Invalid or Missing ID</h1>
      </div>
    );
  }
  // Pass the id as a prop to the client component
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return <OrganizationSpecificClient id={id} />;

}
