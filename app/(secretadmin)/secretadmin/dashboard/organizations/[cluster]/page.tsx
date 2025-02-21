'use client'
import OrganizationDashCard from '@/components/OrganizationDashCard';
import { useAuth } from '@/hooks/useAuth';
import useFetchData from '@/hooks/useFetchData';
import { IOrganization } from '@/types/organization.types';
import { Loader, Card, TextInput, Modal, Button, Group, FileInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const params = useParams();
  const cluster = params.cluster;
  const { data, loading, error } = useFetchData("/api/admin/organizations/" + cluster);
  const { user, loading: userLoading } = useAuth();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    title: '',
    name: '',
    body: '',
    course: '',
    cluster: '',
    image: '',
  });
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/secretadmin");
    }
  }, [user, loading]);

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

  const handleIconClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalLoading(true);

    let imageUrl = formValues.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', { // Replace with your Cloudinary cloud name
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        notifications.show({
          title: 'Error',
          message: errorData.message,
          autoClose: 2000,
          color: 'red',
          position: 'bottom-center',
        });
        setGlobalLoading(false);
        return;
      }

      const result = await response.json();
      imageUrl = result.secure_url;
    }

    try {
      const response = await fetch('/api/admin/organizations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formValues, image: imageUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      notifications.show({
        title: 'Success',
        message: 'Organization created successfully',
        autoClose: 2000,
        color: 'green',
        position: 'bottom-center',
      });
      setShowForm(false);
      setFormValues({
        title: '',
        name: '',
        body: '',
        course: '',
        cluster: '',
        image: '',
      });
      setOrganizations([...organizations, result.data]);
    } catch (err) {
      const error = err as Error;
      notifications.show({
        title: 'Error',
        message: error.message,
        autoClose: 2000,
        color: 'red',
        position: 'bottom-center',
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div className="p-8 w-full h-screen bg-gradient-to-br from-white to-slate-200 flex flex-col md:flex-row justify-center items-center gap-10">
      {globalLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <Loader size="xl" />
        </div>
      )}
      {loading ? <Loader /> : (
        <div className="flex flex-wrap justify-center items-center gap-10">
          {organizations.map((organization: IOrganization, key: number) => (
            <OrganizationDashCard key={key} organization={organization} />
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
            label="Title"
            name="title"
            value={formValues.title}
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
          <TextInput
            label="Body"
            name="body"
            value={formValues.body}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Course"
            name="course"
            value={formValues.course}
            onChange={handleInputChange}
            required
          />
          <TextInput
            label="Cluster"
            name="cluster"
            value={formValues.cluster}
            onChange={handleInputChange}
            required
          />
          <FileInput
            label="Image"
            placeholder="Upload image or provide a link"
            value={imageFile}
            onChange={handleFileChange}
            accept="image/*"
          />
          <TextInput
            label="Image URL (optional)"
            name="image"
            value={formValues.image}
            onChange={handleInputChange}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
}