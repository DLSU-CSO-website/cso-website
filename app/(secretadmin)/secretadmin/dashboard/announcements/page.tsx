"use client"

import AnnouncementDashCard from "@/components/AnnouncementDashCard"
import useFetchData from "@/hooks/useFetchData"
import { IAnnouncement } from "@/types/announcement.types"
import { Loader } from "@mantine/core"
import { useEffect } from "react"

export default function AnnouncementDashboard() {
  const { data, loading, error } = useFetchData("/api/announcements")
  useEffect(() => {
    console.log(data)
  }, [data, loading, error])
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
