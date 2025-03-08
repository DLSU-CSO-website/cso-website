'use client'
import OrganizationDashCard from '@/components/OrganizationDashCard';
import { useAuth } from '@/hooks/useAuth';
import useFetchData from '@/hooks/useFetchData';
import useOrganizationUpload from '@/hooks/useOrganizationUpload';
import { IOrganization } from '@/types/organization.types';
import { Loader, Card, TextInput, Modal, Button, Group, FileInput, FileButton, Image, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconFilePlus } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user, loading: userLoading } = useAuth();
  const params = useParams();
  const cluster = params.cluster as string;
  const { data, loading, error } = useFetchData("/api/admin/organizations/" + cluster);
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formValues, setFormValues] = useState({
    abbreviatedName: '',
    name: '',
    orgDesc: '',
    programs: '',
    facebook: '',
    instagram: '',
    logo: '',
  });
  const [editFormValues, setEditFormValues] = useState<IOrganization | null>(null);
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");

  const { upload, error: uploadError } = useOrganizationUpload();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/secretadmin");
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (data) {
      setOrganizations(data);
    }
  }, [data]);

  useEffect(() => {
    if (error !== "") {
      notifications.show({
        title: "Something went wrong :(",
        message: error
      });
    }
  }, [error]);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImageName(objectUrl);
    } else {
      setImageName("");
    }
  }, [imageFile]);

  useEffect(() => {
    if (uploadError) {
      notifications.show({
        title: "Error",
        message: uploadError,
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      });
    }
  }, [uploadError]);

  const handleIconClick = () => {
    setShowForm(true);
    setImageFile(null);
  };

  const handleCardClick = async (organization: IOrganization) => {
    setEditFormValues(organization);
    setShowEditForm(true);
    if (organization.logo) {
      setImageName(organization.logo);
      const file = await urlToFile(organization.logo, 'logo.jpg', 'image/jpeg');
      setImageFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editFormValues) {
      setEditFormValues({ ...editFormValues, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setGlobalLoading(true);

    const formDataUpload = new FormData();
    formDataUpload.append("abbreviatedName", formValues.abbreviatedName);
    formDataUpload.append("name", formValues.name);
    formDataUpload.append("orgDesc", formValues.orgDesc);
    formDataUpload.append("programs", formValues.programs);
    formDataUpload.append("facebook", formValues.facebook);
    formDataUpload.append("instagram", formValues.instagram);
    if (imageFile) {
      formDataUpload.append("image", imageFile);
    }

    if (!user) {
      setGlobalLoading(false);
      return;
    }

    await upload(formDataUpload, cluster, user.token);

    // False update to see the changes instantaneously
    setOrganizations([...organizations, { ...formValues, logo: imageName }]);

    notifications.show({
      title: "Success",
      message: "Organization created successfully",
      autoClose: 2000,
      color: "green",
      position: "bottom-center"
    });

    setFormValues({
      abbreviatedName: '',
      name: '',
      orgDesc: '',
      programs: '',
      facebook: '',
      instagram: '',
      logo: '',
    });

    setGlobalLoading(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setGlobalLoading(true);

    if (!editFormValues) {
      setGlobalLoading(false);
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("abbreviatedName", editFormValues.abbreviatedName);
    formDataUpload.append("name", editFormValues.name);
    formDataUpload.append("orgDesc", editFormValues.orgDesc);
    formDataUpload.append("programs", editFormValues.programs || '');
    formDataUpload.append("facebook", editFormValues.facebook || '');
    formDataUpload.append("instagram", editFormValues.instagram || '');
    if (imageFile) {
      formDataUpload.append("image", imageFile);
    }

    if (!user) {
      setGlobalLoading(false);
      return;
    }

    try {
      // API call to update the organization details in the database
      const response = await fetch(`/api/admin/organizations/${cluster}/edit?id=${editFormValues._id}&cluster=${cluster}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        body: formDataUpload
      });

      if (!response.ok) {
        throw new Error('Failed to update organization');
      }

      // False update to see the changes instantaneously
      setOrganizations(organizations.map(org => org._id === editFormValues._id ? { ...editFormValues, logo: imageName } : org));

      notifications.show({
        title: "Success",
        message: "Organization edited successfully",
        autoClose: 2000,
        color: "green",
        position: "bottom-center"
      });
      setShowEditForm(false);
      setEditFormValues(null);
    } catch (error) {
      const err = error as Error;
      notifications.show({
        title: "Error",
        message: err.message,
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleDelete = async () => {
    setShowForm(false);
    if (!editFormValues) return;
    if (!user) {
      setGlobalLoading(false);
      return;
    }
    setGlobalLoading(true);

    try {
      const response = await fetch(`/api/admin/organizations/${cluster}/delete?id=${editFormValues._id}&cluster=${cluster}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete organization');
      }

      setShowEditForm(false);
      setEditFormValues(null);
      setOrganizations(organizations.filter(org => org._id !== editFormValues._id));

      notifications.show({
        title: "Success",
        message: "Organization deleted successfully",
        autoClose: 2000,
        color: "green",
        position: "bottom-center"
      });
    } catch (error) {
      const err = error as Error;
      notifications.show({
        title: "Error",
        message: err.message,
        autoClose: 2000,
        color: "red",
        position: "bottom-center"
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  return (
    <div className="p-8 w-full h-screen bg-gradient-to-br from-white to-slate-200 flex flex-col md:flex-row justify-center items-center gap-10">
      {globalLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <Loader size="xl" />
        </div>
      )}
      {loading ? <Loader /> : (
        <div className="flex flex-wrap justify-center items-center gap-10 overflow-auto h-full">
          {organizations.map((organization: IOrganization, key: number) => (
            <OrganizationDashCard key={key} organization={organization} onClick={() => handleCardClick(organization)} />
          ))}
          <Card shadow="md" radius="md" padding="lg" withBorder className="w-72 h-96 flex justify-center items-center transition ease-in-out duration-200 hover:scale-110 cursor-pointer" onClick={handleIconClick}>
            <IconPlus stroke={2} width={"80"} height={"80"} color="gray" />
          </Card>
        </div>
      )}

      <Modal
        opened={showForm}
        onClose={() => setShowForm(false)}
        title="Create New Organization"
        centered
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Abbreviated Name"
            name="abbreviatedName"
            value={formValues.abbreviatedName}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
          />
          <Textarea
            label="Description"
            name="orgDesc"
            value={formValues.orgDesc}
            onChange={handleInputChange}
            required
            minRows={4}
          />
          <TextInput
            label="Programs"
            name="programs"
            value={formValues.programs}
            onChange={handleInputChange}
          />
          <TextInput
            label="Facebook"
            name="facebook"
            value={formValues.facebook}
            onChange={handleInputChange}
          />
          <TextInput
            label="Instagram"
            name="instagram"
            value={formValues.instagram}
            onChange={handleInputChange}
          />
          <div className="w-full h-1/4 mt-10">
            {
              imageName ?
                <>
                  <Image className="object-center w-full h-full" fit="cover" src={imageName} alt={imageName} />
                  <div className="w-full mt-2 flex justify-center items-center">
                    <FileButton accept="image/png,image/jpeg,image/jpg" onChange={setImageFile}>
                      {
                        (props) => (
                          <Button {...props}>Change Image</Button>
                        )
                      }
                    </FileButton>
                  </div>
                </>
                :
                <FileInput accept="image/png,image/jpeg,image/jpg" className="w-full h-full flex justify-center items-center" placeholder={<IconFilePlus />} value={imageFile} onChange={setImageFile} />
            }
          </div>
          <Group align="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>

      <Modal
        opened={showEditForm}
        onClose={() => setShowEditForm(false)}
        title="Edit Organization"
        centered
      >
        <form onSubmit={handleEditSubmit}>
          <TextInput
            label="Abbreviated Name"
            name="abbreviatedName"
            value={editFormValues?.abbreviatedName || ''}
            onChange={handleEditInputChange}
            required
          />
          <TextInput
            label="Name"
            name="name"
            value={editFormValues?.name || ''}
            onChange={handleEditInputChange}
            required
          />
          <Textarea
            label="Description"
            name="orgDesc"
            value={editFormValues?.orgDesc || ''}
            onChange={handleEditInputChange}
            required
            minRows={4}
          />
          <TextInput
            label="Programs"
            name="programs"
            value={editFormValues?.programs || ''}
            onChange={handleEditInputChange}
          />
          <TextInput
            label="Facebook"
            name="facebook"
            value={editFormValues?.facebook || ''}
            onChange={handleEditInputChange}
          />
          <TextInput
            label="Instagram"
            name="instagram"
            value={editFormValues?.instagram || ''}
            onChange={handleEditInputChange}
          />
          <div className="w-full h-1/4 mt-10">
            {
              imageName ?
                <>
                  <Image className="object-center w-full h-full" fit="cover" src={imageName} alt={imageName} />
                  <div className="w-full mt-2 flex justify-center items-center">
                    <FileButton accept="image/png,image/jpeg,image/jpg" onChange={setImageFile}>
                      {
                        (props) => (
                          <Button {...props}>Change Image</Button>
                        )
                      }
                    </FileButton>
                  </div>
                </>
                :
                <FileInput accept="image/png,image/jpeg,image/jpg" className="w-full h-full flex justify-center items-center" placeholder={<IconFilePlus />} value={imageFile} onChange={setImageFile} />
            }
          </div>
          <Group align="right" mt="md">
            <Button type="submit">Save Changes</Button>
            <Button color="red" onClick={handleDelete}>Delete</Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}
