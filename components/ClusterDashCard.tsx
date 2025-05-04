import { useState, useEffect } from "react";
import { ICluster } from "@/types/cluster.types";
import { Card, TextInput, Button, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { ISession } from "@/types/session.types";
import { useRouter } from "next/navigation";

interface ClusterDashCardProps {
  user: ISession | null;
  cluster: ICluster;
  isEditing: boolean;
  setEditingClusterId: (id: string | null) => void;
  onEditSuccess: (updatedCluster: ICluster) => void;
  onDeleteSuccess: (deletedClusterId: string) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export default function ClusterDashCard({
  user,
  cluster,
  isEditing,
  setEditingClusterId,
  onEditSuccess,
  onDeleteSuccess,
  setGlobalLoading
}: ClusterDashCardProps) {
  const { abbreviatedName, fullName, _id } = cluster;
  const link = `/secretadmin/dashboard/organizations/${abbreviatedName}`;
  const [formValues, setFormValues] = useState({ abbreviatedName, fullName });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  // Use Next.js router for navigation - fixes hydration issue with window.location
  const router = useRouter();

  // Initialize form values safely after component mounts
  useEffect(() => {
    setFormValues({ abbreviatedName, fullName });
  }, [abbreviatedName, fullName]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click handler from firing
    setEditingClusterId(_id?.toString() || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click handler from firing

    try {
      const response = await fetch('/api/admin/organizations/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ id: _id, ...formValues }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedCluster = await response.json();
      notifications.show({
        title: 'Success',
        message: 'Cluster updated successfully',
        autoClose: 2000,
        color: 'green',
        position: 'bottom-center',
      });

      setEditingClusterId(null);
      onEditSuccess(updatedCluster);
    } catch (err) {
      const error = err as Error;
      notifications.show({
        title: 'Error',
        message: error.message,
        autoClose: 2000,
        color: 'red',
        position: 'bottom-center',
      });
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click handler from firing
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (confirmInput === "CONFIRM") {
      try {
        const response = await fetch(`/api/admin/organizations/delete?id=${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        notifications.show({
          title: 'Success',
          message: 'Cluster deleted successfully',
          autoClose: 2000,
          color: 'green',
          position: 'bottom-center',
        });

        setEditingClusterId(null);
        setIsModalOpen(false);
        onDeleteSuccess(_id?.toString() || "");
      } catch (err) {
        const error = err as Error;
        notifications.show({
          title: 'Error',
          message: error.message,
          autoClose: 2000,
          color: 'red',
          position: 'bottom-center',
        });
      }
    } else {
      notifications.show({
        title: 'Error',
        message: 'Please type CONFIRM to delete the cluster.',
        autoClose: 2000,
        color: 'red',
        position: 'bottom-center',
      });
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click handler from firing
    setEditingClusterId(null);
  };

  // Fixed: Use Next.js router instead of directly manipulating window.location
  const handleCardClick = () => {
    if (isEditing) return; // Don't navigate when in edit mode

    setGlobalLoading(true);
    // Using setTimeout in a client component is fine
    setTimeout(() => {
      router.push(link);
    }, 1000); // Simulate a delay for loading feedback
  };

  return (
    <>
      <Card
        withBorder
        className="flex h-72 w-80 p-10 justify-center items-center gap-2 bg-green-900 rounded-xl transition ease-in duration-200 hover:scale-105 cursor-pointer"
        onClick={handleCardClick}
      >
        {isEditing ? (
          <div className="w-full" style={{ color: "white" }}>
            <IconX onClick={handleCancelEdit} className="absolute top-2 left-2 cursor-pointer" style={{ color: 'white' }} />
            <TextInput
              label="Full Name"
              name="fullName"
              value={formValues.fullName}
              onChange={handleInputChange}
              required
            />
            <TextInput
              label="Abbreviated Name"
              name="abbreviatedName"
              value={formValues.abbreviatedName}
              onChange={handleInputChange}
              required
            />
            <Button onClick={handleSaveClick} fullWidth mt="md" style={{ backgroundColor: '#66bb6a', color: 'white' }}>
              Save
            </Button>
            <Button onClick={handleDeleteClick} className="absolute top-2 right-2" style={{ backgroundColor: '#ef5350', color: 'white' }}>
              Delete
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="text-2xl text-white font-bold w-full text-center">
                {abbreviatedName}
              </div>
              <div className="text-lg text-white text-center">
                {fullName}
              </div>
            </div>
            <Button
              onClick={handleEditClick}
              className="absolute top-2 right-2"
              style={{ backgroundColor: '#b0bec5', color: 'white' }}
            >
              Edit
            </Button>
          </>
        )}
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Delete"
      >
        <TextInput
          label="Type CONFIRM to delete"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          required
        />
        <Button onClick={handleConfirmDelete} fullWidth mt="md" style={{ backgroundColor: '#ef5350', color: 'white' }}>
          Confirm Delete
        </Button>
      </Modal>
    </>
  );
}
