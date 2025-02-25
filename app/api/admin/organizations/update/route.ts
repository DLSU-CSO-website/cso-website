import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/mongodb.libs";
import Cluster from "@/models/organizations.models";
import { checkAdmin } from "@/libs/authentication.libs";

export const POST = async (request: Request) => {
  try {
    await connectDatabase();
    checkAdmin(request);

    const data = await request.json().catch(() => null);
    if (!data) {
      return NextResponse.json({ message: "Invalid JSON input" }, { status: 400 });
    }

    const { abbreviatedName, fullName } = data;

    if (!abbreviatedName || !fullName) {
      return NextResponse.json({ message: "Abbreviated name and full name are required" }, { status: 400 });
    }

    const existingCluster = await Cluster.findOne({ 
      $or: [{ abbreviatedName }, { fullName }] 
    });

    if (existingCluster) {
      return NextResponse.json({ message: "Cluster with the same abbreviated name or full name already exists" }, { status: 400 });
    }

    const newCluster = await Cluster.createCluster(abbreviatedName, fullName);
    return NextResponse.json({ data: newCluster, message: "Cluster successfully created" }, { status: 201 });
  } catch (e) {
    const err = e as Error;
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};