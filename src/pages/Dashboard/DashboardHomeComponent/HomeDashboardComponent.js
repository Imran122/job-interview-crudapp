import React from "react";
import useAuth from "../../../hooks/useAuth";
import AgentDashboard from "../AgentDashboard/AgentDashboard";
import UserListComponent from "../UserList/UserList ";
import UserPayment from "../UserPayment/UserPayment";
import "./dashboardHome.css";

const HomeDashboardComponent = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="dashboard-main">
        <div className="row">
          {user.role === "super-admin" && <UserListComponent />}
          {user.role === "user" && <UserPayment />}
          {user.role === "agent" && <AgentDashboard />}
        </div>
      </div>
    </>
  );
};

export default HomeDashboardComponent;
