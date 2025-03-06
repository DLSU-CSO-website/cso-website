import { useState } from "react";
import { ICluster } from "@/types/cluster.types";
import { Card, TextInput, Button, Modal} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { ISession } from "@/types/session.types";

interface ClusterDashCardProps {
  user: ISession | null;
  cluster: ICluster;
  isEditing: boolean;
  setEditingClusterId: (id: string | null) => void;
  onEditSuccess: (updatedCluster: ICluster) => void;
  onDeleteSuccess: (deletedClusterId: string) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export default function ClusterDashCard({ user, cluster, isEditing, setEditingClusterId, onEditSuccess, onDeleteSuccess, setGlobalLoading }: ClusterDashCardProps) {
  const { abbreviatedName, fullName, _id } = cluster;
  const link = `/secretadmin/dashboard/organizations/${abbreviatedName}`;
  const [formValues, setFormValues] = useState({ abbreviatedName, fullName });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");

  const handleEditClick = () => {
    setEditingClusterId(_id?.toString() || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClick = async () => {
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

  const handleDeleteClick = () => {
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

  const handleCancelEdit = () => {
    setEditingClusterId(null);
  };

  const handleCardClick = () => {
    setGlobalLoading(true);
    setTimeout(() => {
      window.location.href = link;
    }, 1000); // Simulate a delay for loading feedback
  };

  return (
    <>
      <Card withBorder className="relative flex justify-center items-center gap-2 bg-green-900 rounded-xl p-10 transition ease-in duration-200 hover:scale-110 cursor-pointer">
        {isEditing ? (
          <div className="w-full">
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
            <div onClick={handleCardClick} className="flex-grow">
              <div className="text-2xl text-white font-bold">
                {fullName}
              </div>
              <div className="text-lg text-white">
                {abbreviatedName}
              </div>
            </div>
            <Button onClick={handleEditClick} className="absolute top-2 right-2" style={{ backgroundColor: '#b0bec5', color: 'white' }}>
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