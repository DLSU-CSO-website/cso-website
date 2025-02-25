import { IOrganization } from "@/types/organization.types";
import { Card, Image } from "@mantine/core";

interface OrganizationDashCardProps {
  organization: IOrganization;
  onClick: () => void;
}

export default function OrganizationDashCard({ organization, onClick }: OrganizationDashCardProps) {
  return (
    <Card
      shadow="md"
      radius="md"
      withBorder
      className="w-full h-full md:w-72 md:h-96 transition ease-in-out duration-200 hover:scale-110 cursor-pointer"
      onClick={onClick}
    >
      <Card.Section>
        <Image
          src={organization.logo}
          alt={`${organization.abbreviatedName} image`}
        />
      </Card.Section>
      <Card.Section className="w-full flex flex-col justify-start items-center p-2">
        <span className="w-full md:text-2xl text-lg">{organization.abbreviatedName}</span>
        <span className="text-gray-500">{organization.name}</span>
      </Card.Section>
    </Card>
  );
}