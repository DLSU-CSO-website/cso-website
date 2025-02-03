import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/mongodb.libs";
import Cluster from "@/models/organizations.models";
import { checkAdmin } from "@/libs/authentication.libs";
import { ObjectId } from "mongodb";

export const DELETE = async (request: Request) => {
  try {
    await connectDatabase();
    // checkAdmin(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Cluster ID is required" }, { status: 400 });
    }

    const deletedCluster = await Cluster.deleteOne({ _id: new ObjectId(id) });

    if (deletedCluster.deletedCount === 0) {
      return NextResponse.json({ message: "Cluster not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cluster successfully deleted" }, { status: 200 });
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};