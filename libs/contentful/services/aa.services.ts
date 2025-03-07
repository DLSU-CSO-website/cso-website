import client from "../index"

export const getAnnualActivities = async () => {
  try {
    const res = await client.getEntries({
      content_type: "annualActivities",
    })

    if (res.items.length === 0) return []
    return res.items
  } catch (err) {
    console.log(err)
    return null
  }
}
