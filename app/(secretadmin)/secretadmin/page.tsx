'use client'

import { useAuth } from "@/hooks/useAuth"
import useLogin from "@/hooks/useLogin"
import { Button, Card, Input, Loader } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

//TODO:
// -START WORKING ON AUTHENTICATION AND AUTHORIZATION SETUP FOR SESSION MANAGEMENT
// -START CREATING THE ANNOUNCEMENT PAGE FOR VIEWING AND EDITING! 

export default function LoginPage() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()
  const { success, error, loading, login } = useLogin()
  const { user, loading: userLoading } = useAuth()

  useEffect(() => {
    if (success) {
      router.push("/secretadmin/dashboard")
    }
    if (error !== "") {
      notifications.show({
        title: "Error",
        message: error,
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      })
    }

  }, [success, error])

  useEffect(() => {
    if (!userLoading) {
      // console.log("user: ", user)
      if (user) {
        router.push("secretadmin/dashboard")
      }
    }
  }, [user, userLoading])

  const loginUser = () => {
    login(username, password)
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-blue-50">
        <Card className="flex flex-col gap-5 justify-center items-center border-2 border-green-800 p-10 bg-slate-100 rounded-lg">
          <span className="text-black text-2xl font-bold">Admin Login Page</span>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="border-2 border-green-800 p-2 rounded-lg" onClick={loginUser}>{loading ? <Loader color="green" /> : "Login"}</Button>
        </Card>
      </div>
    </>
  )
}

