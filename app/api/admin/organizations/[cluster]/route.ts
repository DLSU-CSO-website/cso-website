import { connectDatabase } from "@/libs/mongodb.libs"
import Cluster from "@/models/organizations.models"
import { NextResponse } from "next/server"

export const GET = async (_request: Request, { params }: { params: Promise<{ cluster: string }> }) => {
  try {
    connectDatabase()
    const { cluster } = await params
    const organizations = await Cluster.viewOrganizationsByCluster(cluster)
    console.log("FETCHED")
    return NextResponse.json({ data: organizations, message: "Succesfully fetched" }, { status: 200 })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
