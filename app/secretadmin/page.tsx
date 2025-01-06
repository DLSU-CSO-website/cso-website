'use client'

import { Card, Input } from "@mantine/core"

//TODO:
// -START WORKING ON AUTHENTICATION AND AUTHORIZATION SETUP FOR SESSION MANAGEMENT
// -START CREATING THE ANNOUNCEMENT PAGE FOR VIEWING AND EDITING! 

export default function LoginPage() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-blue-50">
        <Card className="flex flex-col gap-5 justify-center items-center border-2 border-green-800 p-10 bg-slate-100 rounded-lg">
          <Card.Section>
            <span className="text-black text-2xl font-bold">Admin Login Page</span>
          </Card.Section>
          <Input placeholder="Username" radius="md" size="md" />
          <Input placeholder="Password" />
        </Card>
      </div>
    </>
  )
}

