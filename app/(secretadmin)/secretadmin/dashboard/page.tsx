'use client'

import AdminDashCard from "@/components/AdminDashCard"
import { useAuth } from "@/hooks/useAuth"
import { IAdminRouteTypes } from "@/types/adminRouteTypes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ROUTES: IAdminRouteTypes[] = [
  {
    title: "Announcements",
    link: "/secretadmin/dashboard/announcements",
    description: "Manage Announcements data here!"
  },
  {
    title: "Organizations",
    link: "/secretadmin/dashboard/organizations",
    description: "Manage Organizations data here!"
  }
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    console.log(user)
    if (!loading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user, loading])
  return (
    <div className="w-full h-screen flex flex-auto justify-center items-center gap-10">
      {
        ROUTES.map((route, key) => (
          <AdminDashCard key={key} title={route.title} description={route.description} link={route.link} />
        ))
      }
    </div>
  )
}
