'use client'

import AdminDashCard from "@/components/AdminDashCard"
import { useAuth } from "@/hooks/useAuth"
import { IAdminRouteTypes } from "@/types/adminRouteTypes"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ROUTES: IAdminRouteTypes[] = [
    //TODO: Pull Organization Clusters Data here
  {
    title: "ASO",
    link: "/secretadmin/dashboard/organizations/ASO",
    description: "Alliance of Science Organizations"
  },
  {
    title: "CAP-13",
    link: "/secretadmin/dashboard/organizations/CAP-13",
    description: "College of Liberal Arts Professional Organizations"
  },
  {
    title: "ENGAGE",
    link: "/secretadmin/dashboard/organizations/ENGAGE",
    description: "Engineering Alliance Geared Towards Excellence"
  },
  {
    title: "ASPIRE",
    link: "/secretadmin/dashboard/organizations/ASPIRE",
    description: "Alliance of Special Interest & Socio-Civic Organizations"
  },
  {
    title: "PROBE",
    link: "/secretadmin/dashboard/organizations/PROBE",
    description: "Alliance of Professional Organizations of Business & Economics"
  }
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user, loading])
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-wrap justify-center items-center gap-10">
            {
            ROUTES.map((route, key) => (
                <AdminDashCard key={key} title={route.title} description={route.description} link={route.link} />
            ))
            }
        </div>
    </div>
  )
}
