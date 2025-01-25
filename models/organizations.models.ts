import { Schema, model, Model, models } from "mongoose";
import { IOrganization } from "@/types/organization.types";
import { ICluster } from "@/types/cluster.types";

interface ClusterModel extends Model<ICluster> {
  createCluster(abbreviatedName: string, fullName: string): Promise<ICluster>;
  editCluster(abbreviatedName: string, newAbbreviatedName: string, newFullName: string): Promise<ICluster | null>;
  addOrganization(abbreviatedName: string, organization: IOrganization): Promise<ICluster | null>;
  editOrganization(abbreviatedName: string, organizationId: string, organization: Partial<IOrganization>): Promise<ICluster | null>;
  deleteOrganization(abbreviatedName: string, organizationId: string): Promise<ICluster | null>;
  viewOrganizations(): Promise<IOrganization[]>;
  viewOrganizationsByCluster(abbreviatedName: string): Promise<IOrganization[]>;
  viewClusters(): Promise<ICluster[]>;
}

const organizationSchema = new Schema<IOrganization>({
  title: { type: String, required: true },
  name: { type: String, required: true },
  body: { type: String, required: true },
  course: { type: String, required: true },
  cluster: { type: String, required: true },
  image: { type: String },
});

const clusterSchema = new Schema<ICluster, ClusterModel>({
  abbreviatedName: { type: String, required: true },
  fullName: { type: String, required: true },
  organizations: [organizationSchema],
}, { timestamps: true });

clusterSchema.static(
  "createCluster", 
  async function createCluster(abbreviatedName: string, fullName: string) {
    const existingCluster = await this.findOne({ 
      $or: [{ abbreviatedName }, { fullName }] 
    });
    if (existingCluster) {
      throw new Error('Cluster with the same abbreviated name or full name already exists');
    }
    const cluster = await this.create({ abbreviatedName, fullName, organizations: [] });
    return cluster;
  }
);

clusterSchema.static(
  "editCluster", 
  async function editCluster(abbreviatedName: string, newAbbreviatedName: string, newFullName: string) {
    const cluster = await this.findOneAndUpdate({ abbreviatedName }, { abbreviatedName: newAbbreviatedName, fullName: newFullName }, { new: true });
    if (!cluster) {
      throw new Error(`Cluster with abbreviated name ${abbreviatedName} not found`);
    }
    return cluster;
  }
);

clusterSchema.static(
  "addOrganization", 
  async function addOrganization(abbreviatedName: string, organization: IOrganization) {
    const cluster = await this.findOne({ abbreviatedName });
    if (!cluster) {
      throw new Error(`Cluster with abbreviated name ${abbreviatedName} not found`);
    }
    cluster.organizations.push(organization);
    await cluster.save();
    return cluster;
  }
);

clusterSchema.static(
  "editOrganization", 
  async function editOrganization(abbreviatedName: string, organizationId: string, organization: Partial<IOrganization>) {
    const cluster = await this.findOne({ abbreviatedName });
    if (!cluster) {
      throw new Error(`Cluster with abbreviated name ${abbreviatedName} not found`);
    }
    const orgIndex = cluster.organizations.findIndex(org => org._id && org._id.toString() === organizationId);
    if (orgIndex === -1) {
      throw new Error(`Organization with the ID: ${organizationId} not found`);
    }
    cluster.organizations[orgIndex] = { ...cluster.organizations[orgIndex], ...organization };
    await cluster.save();
    return cluster;
  }
);

clusterSchema.static(
  "deleteOrganization", 
  async function deleteOrganization(abbreviatedName: string, organizationId: string) {
    const cluster = await this.findOne({ abbreviatedName });
    if (!cluster) {
      throw new Error(`Cluster with abbreviated name ${abbreviatedName} not found`);
    }
    const orgIndex = cluster.organizations.findIndex(org => org._id && org._id.toString() === organizationId);
    if (orgIndex === -1) {
      throw new Error(`Organization with the ID: ${organizationId} not found`);
    }
    cluster.organizations = cluster.organizations.filter(org => org._id && org._id.toString() !== organizationId);
    await cluster.save();
    return cluster;
  }
);

clusterSchema.static(
  "viewOrganizations", 
  async function viewOrganizations() {
    const clusters = await this.find();
    if (!clusters) {
      throw new Error('No clusters found');
    }
    const organizations = clusters.reduce<IOrganization[]>((acc, cluster) => acc.concat(cluster.organizations), []);
    return organizations;
  }
);

clusterSchema.static(
  "viewOrganizationsByCluster", 
  async function viewOrganizationsByCluster(abbreviatedName: string) {
    const cluster = await this.findOne({ abbreviatedName });
    if (!cluster) {
      throw new Error(`Cluster with abbreviated name ${abbreviatedName} not found`);
    }
    return cluster.organizations;
  }
);

clusterSchema.static(
  "viewClusters", 
  async function viewClusters() {
    const clusters = await this.find();
    // if (!clusters || clusters.length === 0) {
    //   throw new Error('No clusters found');
    // }
    return clusters;
  }
);

const Cluster = (models.Cluster as ClusterModel) || model<ICluster, ClusterModel>("Cluster", clusterSchema)

export default Cluster;