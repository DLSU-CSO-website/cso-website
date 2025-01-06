'use client'

import { AuthContextProvider } from "@/contexts/AuthContext";
import { Notifications } from "@mantine/notifications"
import '@mantine/notifications/styles.css';

export default function SecretAdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <Notifications />
      {children}
    </AuthContextProvider>
  )
}
