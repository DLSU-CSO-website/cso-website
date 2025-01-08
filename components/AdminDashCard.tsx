import { IAdminRouteTypes } from "@/types/adminRouteTypes";
import { Card } from "@mantine/core";
import Link from "next/link";

export default function AdminDashCard({ title, link, description }: IAdminRouteTypes) {
  return (
    <Link href={link}>
      <Card withBorder className="flex justify-center items-center gap-2 bg-green-900 rounded-xl p-10 transition ease-in duration-200 hover:scale-110 cursor-pointer">

        <div className="text-2xl text-white font-bold">
          {title}
        </div>
        <div className="text-lg text-white">
          {description}
        </div>
      </Card>
    </Link>
  )
}
