import { IPertinentLinksFields } from "@/types/generated/contentful";
import client from "../index"

export const getPertinentLinks = async () => {
  try {
    const res = await client.getEntries({
      content_type: "pertinentLinks",
    })

    if (res.items.length === 0) return []
    const activities = res.items.map(item => {
      const rawFields = item.fields as any
      return rawFields as IPertinentLinksFields
    })

    return activities
  } catch (err) {
    console.log(err)
    return null
  }
}
