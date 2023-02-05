import { useState } from "react";
import { getLocalStorage, isAuth } from "../utilities/helper";

const useContextData = () => {
  const [user, setUser] = useState(isAuth());
  const [isLoading, setIsLoading] = useState(false);

  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");

  //car rent upload data state

  return {
    user,
    setUser,
    token,
    isLoading,
    setIsLoading,
    authError,
    setAuthError,
    authSuccess,
    setAuthSuccess,
    admin,
    setAdmin,
  };
};

export default useContextData;
