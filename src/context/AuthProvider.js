import React, { createContext } from "react";
import useContextData from "../hooks/useContextData";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const allcontext = useContextData();
  return (
    <AuthContext.Provider value={allcontext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
