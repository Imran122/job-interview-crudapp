import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const mystyle = {};

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
  return user.email ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
export default PrivateRoute;
