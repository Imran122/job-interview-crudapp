import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../dashboard.css";
import DashboardMenus from "../../../views/components/dashboard/home/DashboardMenus";
import Header from "../../../views/components/dashboard/home/Header";

const DashboardHome = () => {
  const [menuShow, setMenuShow] = useState(true);

  return (
    <div>
      {/* dashboard header */}
      <Header menuShow={menuShow} setMenuShow={setMenuShow} />

      {/* dashboard main content */}
      <div className="dashboard-content">

        {/* dashboard left menus */}
        <div className={`dashboard-menu ${menuShow ? "dashboard-menu-show" : "dashboard-menu-hidden"}`}>
          <DashboardMenus />
        </div>

        {/* dashboard body */}
        <div className={`dashboard-main-content ${menuShow ? "content-show" : "content-hidden"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
