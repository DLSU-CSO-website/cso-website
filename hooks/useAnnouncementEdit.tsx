import { useState } from "react";


const useAnnouncementEdit = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const uploadEdit = async (formData: FormData, token: string) => {
    setLoading(true)
    const res = await fetch("/api/admin/announcements/", {
      method: "PUT",
      body: formData,
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

  return { success, error, loading, uploadEdit }
}

export default useAnnouncementEdit
