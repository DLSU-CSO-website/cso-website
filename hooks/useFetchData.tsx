import { useEffect, useState } from "react"

const useFetchData = (url: string) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await fetch(url)

      const json = await res.json()
      if (!res.ok) {
        setError(error)
        setLoading(false)
      }

      setData(json.data)
      setLoading(false)
    }
    fetchData()
  }, [url])

  return { loading, data, error }
}

export default useFetchData
