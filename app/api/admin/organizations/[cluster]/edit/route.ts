import { NextResponse } from 'next/server';
import Cluster from '@/models/organizations.models';
import { IOrganization } from '@/types/organization.types';
import { checkAdmin } from '@/libs/authentication.libs';
import { uploadImageCloudinary } from '@/libs/imageUploader.libs';
import { UploadApiResponse } from 'cloudinary';
import { connectDatabase } from '@/libs/mongodb.libs';

export const POST = async (request: Request) => {
  try {
    connectDatabase();
    const { searchParams } = new URL(request.url);
    const cluster = searchParams.get('cluster');
    const organizationId = searchParams.get('id');
    const data = await request.formData();
    checkAdmin(request);

    const abbreviatedName = data.get('abbreviatedName');
    const name = data.get('name');
    const orgDesc = data.get('orgDesc');
    const programs = data.get('programs');
    const facebook = data.get('facebook');
    const instagram = data.get('instagram');
    const logo = data.get('logo');

    // Console log statements for testing
    // console.log("Cluster:", cluster);
    // console.log("Organization ID:", organizationId);
    // console.log("Abbreviated Name:", abbreviatedName);
    // console.log("Name:", name);
    // console.log("Description:", orgDesc);
    // console.log("Programs:", programs);
    // console.log("Facebook:", facebook);
    // console.log("Instagram:", instagram);
    // console.log("Logo:", logo);

    if (typeof cluster !== 'string' || typeof organizationId !== 'string') {
      return NextResponse.json({ message: 'Invalid cluster or organization ID parameter' }, { status: 400 });
    }

    if (!abbreviatedName) {
      return NextResponse.json({ message: 'Missing required field: abbreviatedName' }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ message: 'Missing required field: name' }, { status: 400 });
    }
    if (!orgDesc) {
      return NextResponse.json({ message: 'Missing required field: orgDesc' }, { status: 400 });
    }

    let imageUrl = '';
    if (data.get('image')) {
      const imageFile = data.get('image') as File;
      const fileBuffer = await imageFile.arrayBuffer();
      const fileStream = Buffer.from(fileBuffer);

      const result = await uploadImageCloudinary(fileStream) as UploadApiResponse;
      if (!result) {
        return NextResponse.json({ message: 'Could not upload the photo!' }, { status: 500 });
      }
      imageUrl = result.secure_url;
    }

    const organization: Partial<IOrganization> = {
      abbreviatedName: String(abbreviatedName),
      name: String(name),
      orgDesc: String(orgDesc),
      programs: programs ? String(programs) : undefined,
      facebook: facebook ? String(facebook) : undefined,
      instagram: instagram ? String(instagram) : undefined,
      logo: imageUrl || String(logo),
    };

    const updatedCluster = await Cluster.editOrganization(cluster, organizationId, organization);
    return NextResponse.json({ data: updatedCluster, message: 'Organization successfully updated!' }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
