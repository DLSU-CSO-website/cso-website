import { useState } from "react"

const useAnnouncementUpload = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const upload = async (announcement: FormData, token: string) => {
    setLoading(true)
    const res = await fetch("/api/admin/announcements/", {
      method: "POST",
      body: announcement,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const json = await res.json()
    if (!res.ok) {
      setError(json.message)
      setLoading(false)
      return
    }
    setSuccess(true)
    setLoading(false)
  }

  return { upload, loading, error, success }
}


export default useAnnouncementUpload
