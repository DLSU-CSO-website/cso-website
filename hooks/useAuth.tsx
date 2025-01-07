import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error("UseAuth misused")
  }

  return context
}
