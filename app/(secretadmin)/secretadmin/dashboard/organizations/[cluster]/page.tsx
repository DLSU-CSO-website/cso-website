'use client'
import OrganizationDashCard from '@/components/OrganizationDashCard';
import { useAuth } from '@/hooks/useAuth';
import useFetchData from '@/hooks/useFetchData';
import { IOrganization } from '@/types/organization.types';
import { Loader, Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const params = useParams();
  const cluster = params.cluster;
  const { data, loading, error } = useFetchData("/api/admin/organizations/"+cluster)
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()



  useEffect(() => {
    console.log(user)
    if (!userLoading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user, userLoading])

  useEffect(() => {
    if (error !== "") {
      notifications.show({
        title: "Something went wrong :(",
        message: data.message
      })
    }
  }, [error])
  
 

  return (
    <div className="p-8 w-full h-screen bg-gradient-to-br from-white to-slate-200 flex flex-col md:flex-row justify-center items-center gap-10">
      {
        loading ? <Loader /> : (
          <>
            {

              data?.map((organization: IOrganization, key: number) => (
                <OrganizationDashCard key={key} organization={organization} />
              ))
            }
            <Card shadow="md" radius="md" padding="lg" withBorder className="w-72 h-96 flex justify-center items-center transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
              <IconPlus stroke={2} width={"80"} height={"80"} color="gray" />
            </Card>
          </>
        )
      }
    </div>
  )
}