'use client'

import { AuthContextProvider } from "@/contexts/AuthContext";
import { Notifications } from "@mantine/notifications"
import '@mantine/notifications/styles.css';
import { mantineHtmlProps, ColorSchemeScript, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css'
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"
import "@mantine/tiptap/styles.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SecretAdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <AuthContextProvider>
            <Notifications />
            {children}
          </AuthContextProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
