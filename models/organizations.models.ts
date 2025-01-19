import { IOrganization } from "@/types/organization.types";
import { model, Model, Schema } from "mongoose";

interface OrganizationModel extends Model<IOrganization> {
  createOrganization(title: string, name: string, bio: string, course: string, cluster: string, image?: string): Promise<IOrganization>
  editOrganization(title: string, name: string,  bio: string, course: string, cluster: string, id: string, image?: string): Promise<IOrganization>
  deleteOrganization(id: string): Promise<IOrganization>
  viewOrganizations(): Promise<IOrganization[]>
  viewOrganizationById(id: string): Promise<IOrganization>
  viewOrganizationByCluster(cluster: string): Promise<IOrganization>
}

const organizationSchema = new Schema<IOrganization, OrganizationModel>({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  cluster: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
}, { timestamps: true })

organizationSchema.static(
  "createOrganization", // IMAGE SHOULD BE UPLOADED AT THIS POINT!
  async function createOrganization(title: string, name: string, bio: string, course: string, cluster: string, image?: string) {
    if (!image) {
      image = ""
    }
    const organization = await this.create({
      title,
      name,
      bio,
      course,
      cluster,
      image
    })
    return organization
  }
)

organizationSchema.static(
  "editOrganization",
  async function editOrganization(title: string, name: string, bio: string, course: string, cluster: string, id: string, image?: string) {
    const organization = await this.findById(id)

    if (!organization) {
      throw Error("This announcement does not exist")
    }

    organization.name = name
    organization.title = title
    organization.course = course
    organization.cluster = cluster
    if (image) {
      organization.image = image
    }

    await organization.save()

    return organization
  }
)

organizationSchema.static(
  "deleteOrganization",
  async function deleteOrganization(id: string) {
    const organization = await this.findByIdAndDelete(id)
    return organization
  }
)

organizationSchema.static(
  "viewOrganization",
  async function viewOrganization() {
    const organization = await this.find()
    return organization
  }
)

organizationSchema.static(
  "viewOrganizationById",
  async function viewOrganizationById(id: string) {
    const organization = await this.findById(id)
    return organization
  }
)

organizationSchema.static(
  "viewOrganizationByCluster",
  async function viewOrganizationByCluster(cluster: string) {
    const organization = await this.find({ cluster: cluster })
    return organization
  }
)

const Organization = model<IOrganization, OrganizationModel>("Organization", organizationSchema)

export default Organization
