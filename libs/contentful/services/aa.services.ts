import { IAnnualActivitiesFields } from "@/types/generated/contentful"
import client from "../index"

export const getAnnualActivities = async () => {
  try {
    const res = await client.getEntries({
      content_type: "annualActivities",
    })

    if (res.items.length === 0) return []
    const activities = res.items.map(item => {
      const rawFields = item.fields as any
      return rawFields as IAnnualActivitiesFields
    })


    return activities
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getAnnualActivityByName = async (name: string): Promise<IAnnualActivitiesFields | null> => {
  try {
    const res = await client.getEntries({
      content_type: "annualActivities",
      'fields.title': name,
      limit: 1
    })

    if (res.items.length === 0) return null

    return res.items[0].fields as unknown as IAnnualActivitiesFields
  } catch (err) {
    console.log(err)
    return null
  }
}
