import { useAuth } from "@/hooks/useAuth";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation"

export default function AdminNav() {
  const { dispatch } = useAuth()
  const router = useRouter()
  const logout = () => {
    if (dispatch) {
      dispatch({ type: "LOGOUT" })
      router.push("/secretadmin")
    }
  }

  return (
    <>
      <div className="w-full flex justify-end items-center p-5 absolute z-10">
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  )
}
