import { useEffect, useState } from "react"

const useFetchData = (url: string) => {
  const [loading, setLoading] = useState(true)
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

      setLoading(false)
      setData(json.data)
      console.log(json.data)
    }
    fetchData()
  }, [url])

  return { loading, data, error }
}

export default useFetchData
