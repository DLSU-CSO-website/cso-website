"use client"

import AnnouncementDashCard from "@/components/AnnouncementDashCard"
import { useAuth } from "@/hooks/useAuth"
import useFetchData from "@/hooks/useFetchData"
import { IAnnouncement } from "@/types/announcement.types"
import { Loader } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AnnouncementDashboard() {
  const { data, loading, error } = useFetchData("/api/announcements")
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
    if (error) {
      notifications.show({
        title: "Something went wrong :(",
        message: data.message
      })
    }
  }, [error])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-white to-slate-200 flex justify-center items-center gap-10">
      {
        loading ? <Loader /> : data?.map((announcement: IAnnouncement, key: number) => (
          <AnnouncementDashCard key={key} announcement={announcement} />
        ))
      }
    </div>
  )
}
