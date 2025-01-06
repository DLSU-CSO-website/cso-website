'use client'

import { useState, useEffect } from "react"

const useCheckAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin") as string);

    if (admin && admin.token) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [])

  return { authenticated };
};

export default useCheckAuth
