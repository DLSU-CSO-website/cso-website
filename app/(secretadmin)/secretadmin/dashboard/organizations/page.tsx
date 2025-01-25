'use client'

//const ROUTES: IAdminRouteTypes[] = [
    //TODO: Pull Organization Clusters Data here
  // {
  //   title: "ASO",
  //   link: "/secretadmin/dashboard/organizations/ASO",
  //   description: "Alliance of Science Organizations"
  // },
  // {
  //   title: "CAP-13",
  //   link: "/secretadmin/dashboard/organizations/CAP-13",
  //   description: "College of Liberal Arts Professional Organizations"
  // },
  // {
  //   title: "ENGAGE",
  //   link: "/secretadmin/dashboard/organizations/ENGAGE",
  //   description: "Engineering Alliance Geared Towards Excellence"
  // },
  // {
  //   title: "ASPIRE",
  //   link: "/secretadmin/dashboard/organizations/ASPIRE",
  //   description: "Alliance of Special Interest & Socio-Civic Organizations"
  // },
  // {
  //   title: "PROBE",
  //   link: "/secretadmin/dashboard/organizations/PROBE",
  //   description: "Alliance of Professional Organizations of Business & Economics"
  // }
//] 

import ClusterDashCard from "@/components/ClusterDashCard"
import { useAuth } from "@/hooks/useAuth"
import useFetchData from '@/hooks/useFetchData'
import { ICluster } from "@/types/cluster.types"
import { Button, Card, Loader, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClusterPage() {
  const { user, loading: userLoading } = useAuth()
  const [refresh, setRefresh] = useState(0);
  const { data, loading, error } = useFetchData(`/api/organizations?refresh=${refresh}`);
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState({ abbreviatedName: '', fullName: '' })

  const router = useRouter()
  useEffect(() => {
    if (!loading && !user) {
      router.push("/secretadmin")
      console.log(data)
    }
    
  }, [user, loading])

  const handleIconClick = () => {
    setShowForm(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formValues))
      const response = await fetch('/api/organizations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const result = await response.json();
      notifications.show({
        title: 'Success',
        message: 'Cluster created successfully',
        autoClose: 2000,
        color: 'green',
        position: 'bottom-center',
      });
      setShowForm(false);
      setFormValues({ abbreviatedName: '', fullName: '' });
      setRefresh(refresh + 1);
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

  if (error) {
    notifications.show({
      title: 'Error',
      message: error,
      color: 'red',
    })
    return <div>Error: {error}</div>
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-10">
        {data  && data.map((cluster: ICluster) => (
          <ClusterDashCard key={cluster._id?.toString()} cluster={cluster} />
        ))}
        <Card shadow="md" radius="md" padding="lg" withBorder className="w-96 h-32 flex justify-center items-center transition ease-in-out duration-200 hover:scale-110 cursor-pointer">
          {showForm ? (
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
          ) : (
            <IconPlus stroke={2} width={"80"} height={"80"} color="gray" onClick={handleIconClick} />
          )}
        </Card>
      </div>
    </div>
  )
}