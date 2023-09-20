import React from "react";
import { useState } from "react";

type ContextProviderProps = {
  children: React.ReactNode;
};
export type CommonContextType = {
  loggedInUser: any;
  setLoggedInUserData: (value: any) => void;
  clearContextAndLogout: () => void;
};

export const CommonContext = React.createContext<CommonContextType | null>(
  null
);

const CommonContextProvider = ({ children }: ContextProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<any>("");

  const setLoggedInUserData = (value: any) => {
    if (value) {
      setLoggedInUser(value);
    }
  };
  const clearContextAndLogout = () => {
    setLoggedInUser(null);
    localStorage.clear();
  };

  return (
    <CommonContext.Provider
      value={{ loggedInUser, setLoggedInUserData, clearContextAndLogout }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;



