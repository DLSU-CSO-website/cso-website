'use client'

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/secretadmin")
      }
    }
  }, [user])
  return (
    <div>Hello</div>
  )
}
