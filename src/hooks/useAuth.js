import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

//useauth using authcontext
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
