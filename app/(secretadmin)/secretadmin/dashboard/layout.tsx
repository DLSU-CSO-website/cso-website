'use client'

import AdminNav from "@/components/AdminNav";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  )
}
