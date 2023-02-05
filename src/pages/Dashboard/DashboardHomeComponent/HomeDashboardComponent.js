import React from "react";
import UserListComponent from "../UserList/UserList ";
import "./dashboardHome.css";

const HomeDashboardComponent = () => {
  return (
    <>
      <div className="dashboard-main">
        <div className="row">
          <UserListComponent />
        </div>
      </div>
    </>
  );
};

export default HomeDashboardComponent;
