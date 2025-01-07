import { ISession } from "@/types/session.types";
import { createContext, ReactNode, useEffect, useReducer } from "react";

export const AuthContext = createContext<{
  user: null | ISession;
  dispatch: React.Dispatch<Action> | undefined;
  loading: boolean;
}>({
  user: null,
  dispatch: undefined,
  loading: true,
});

export type Action = { type: "LOGIN"; payload: ISession } | { type: "LOGOUT" };

const authReducer = (
  state: { user: null | ISession; loading: boolean },
  action: Action | { type: "SET_LOADING"; payload: boolean }
): { user: null | ISession; loading: boolean } => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      localStorage.removeItem("admin");
      return { user: null, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin") as string);


    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch, loading: state.loading }}>
      {children}
    </AuthContext.Provider>
  );
};
