import { useState } from "react";

const useAnnouncementDelete = () => {
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const deleteUpload = async (id: string, token: string) => {
    setLoading(true)
    const res = await fetch("/api/admin/announcements/delete/" + id, {
      method: "DELETE",
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

  return { success, loading, error, deleteUpload }
}

export default useAnnouncementDelete
