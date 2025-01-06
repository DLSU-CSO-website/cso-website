import { ISession } from "@/types/session.types";
import { createContext, ReactNode, useEffect, useReducer } from "react";

export const AuthContext = createContext<{
  user: null | ISession
  dispatch: React.Dispatch<Action> | undefined
}>({ user: null, dispatch: undefined })

export type Action = { type: "LOGIN"; payload: ISession } | { type: "LOGOUT" }


const authReducer = (
  state: { user: null | ISession },
  action: Action
): { user: null | ISession } => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload }
    case "LOGOUT":
      localStorage.removeItem("admin")
      return { user: null }
    default:
      return state
  }
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children
}: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
