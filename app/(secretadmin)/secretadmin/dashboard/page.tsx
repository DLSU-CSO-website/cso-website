'use client'

import useCheckAuth from "@/hooks/useCheckAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { authenticated } = useCheckAuth()
  const router = useRouter()
  useEffect(() => {
    if (!authenticated) {
      router.push("/secretadmin")
    }
  }, [authenticated])
  return (
    <div>Hello</div>
  )
}
