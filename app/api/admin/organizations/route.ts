import { connectDatabase } from "@/libs/mongodb.libs"
import Cluster from "@/models/organizations.models"
import { NextResponse } from "next/server"

export const GET = async (_request: Request) => {
  try {
    connectDatabase()
    const clusters = await Cluster.viewClusters()
    return NextResponse.json({ data: clusters, message: "Clusters successfully fetched" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
