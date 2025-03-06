import { useState } from "react";

const useOrganizationUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const upload = async (organization: FormData, cluster: string, token: string) => {
    setLoading(true);
    const res = await fetch(`/api/admin/organizations/${cluster}/upload?cluster=${cluster}`, {
        method: "POST",
        body: organization,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const json = await res.json();
    if (!res.ok) {
      setError(json.message);
      setLoading(false);
      return;
    }
    setSuccess(true);
    setLoading(false);
  };

  return { upload, loading, error, success };
};

export default useOrganizationUpload;