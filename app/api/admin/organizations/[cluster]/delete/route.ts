import { NextResponse } from 'next/server';
import Cluster from '@/models/organizations.models';
import { checkAdmin } from '@/libs/authentication.libs';
import { connectDatabase } from '@/libs/mongodb.libs';

export const POST = async (request: Request) => {
  try {
    connectDatabase();
    const { searchParams } = new URL(request.url);
    const cluster = searchParams.get('cluster');
    const organizationId = searchParams.get('id');
    checkAdmin(request);

    // Console log statements for testing
    console.log("Cluster:", cluster);
    console.log("Organization ID:", organizationId);

    if (typeof cluster !== 'string' || typeof organizationId !== 'string') {
      return NextResponse.json({ message: 'Invalid cluster or organization ID parameter' }, { status: 400 });
    }

    const updatedCluster = await Cluster.deleteOrganization(cluster, organizationId);
    return NextResponse.json({ data: updatedCluster, message: 'Organization successfully deleted!' }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};