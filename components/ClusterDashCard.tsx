import { ICluster } from "@/types/cluster.types";
import { Card } from "@mantine/core";
import Link from "next/link";

interface ClusterDashCardProps {
  cluster: ICluster;
}

export default function ClusterDashCard({ cluster }: ClusterDashCardProps) {
  const { abbreviatedName, fullName } = cluster;
  const link = `/secretadmin/dashboard/organizations/${abbreviatedName}`;

  return (
    <Link href={link}>
      <Card withBorder className="flex justify-center items-center gap-2 bg-green-900 rounded-xl p-10 transition ease-in duration-200 hover:scale-110 cursor-pointer">
        <div className="text-2xl text-white font-bold">
          {fullName}
        </div>
        <div className="text-lg text-white">
          {abbreviatedName}
        </div>
      </Card>
    </Link>
  );
}