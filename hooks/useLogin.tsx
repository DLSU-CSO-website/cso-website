import { useState } from "react"
import { useAuth } from "./useAuth"

const useLogin = () => {
  const { dispatch } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const login = async (username: string, password: string) => {
    setError("")
    if (!username || !password) {
      setError("Please make sure all fields are filled!")
      return
    }
    setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const json = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(json.message)
      return
    }
    localStorage.setItem("admin", JSON.stringify(json))
    dispatch?.({ type: "LOGIN", payload: json })
    setSuccess(true)
  }

  return { success, error, loading, login }
}

export default useLogin
