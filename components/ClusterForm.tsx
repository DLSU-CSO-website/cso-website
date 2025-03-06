import { Button, Card, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";

interface ClusterFormProps {
  onSuccess: () => void;
}

const ClusterForm: React.FC<ClusterFormProps> = ({ onSuccess }) => {
  const [formValues, setFormValues] = useState({ abbreviatedName: "", fullName: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/organizations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      notifications.show({
        title: "Success",
        message: "Cluster created successfully",
        autoClose: 2000,
        color: "green",
        position: "bottom-center",
      });
      setFormValues({ abbreviatedName: "", fullName: "" });
      onSuccess();
    } catch (err) {
      const error = err as Error;
      notifications.show({
        title: "Error",
        message: error.message,
        autoClose: 2000,
        color: "red",
        position: "bottom-center",
      });
    }
  };

  return (
    <Card shadow="md" radius="md" padding="lg" withBorder className="w-96 h-32 flex justify-center items-center transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
      <form onSubmit={handleSubmit} className="w-full">
        <TextInput
          label="Abbreviated Name"
          name="abbreviatedName"
          value={formValues.abbreviatedName}
          onChange={handleInputChange}
          required
        />
        <TextInput
          label="Full Name"
          name="fullName"
          value={formValues.fullName}
          onChange={handleInputChange}
          required
        />
        <Button type="submit" fullWidth mt="md">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default ClusterForm;