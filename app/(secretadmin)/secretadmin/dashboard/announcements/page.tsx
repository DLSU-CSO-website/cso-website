"use client"

import AnnouncementDashCard from "@/components/AnnouncementDashCard"
import { useAuth } from "@/hooks/useAuth"
import useFetchData from "@/hooks/useFetchData"
import { IAnnouncement } from "@/types/announcement.types"
import { Loader, Card } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IconPlus } from '@tabler/icons-react';
import Link from "next/link"

export default function AnnouncementDashboard() {
  const { data, loading, error } = useFetchData("/api/announcements")
  const { user, loading: userLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
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
    <div className="p-8 w-full h-screen bg-gradient-to-br from-white to-slate-200 flex flex-col md:flex-row flex-wrap justify-center items-center gap-10">
      {
        loading ? <Loader /> : (
          <>
            {

              data?.map((announcement: IAnnouncement, key: number) => (
                <AnnouncementDashCard key={key} announcement={announcement} />
              ))
            }
            <Link href="/secretadmin/dashboard/announcements/create">
              <Card shadow="md" radius="md" padding="lg" withBorder className="w-72 h-96 flex justify-center items-center transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
                <IconPlus stroke={2} width={"80"} height={"80"} color="gray" />
              </Card>
            </Link>
          </>
        )
      }
    </div>
  )
}
