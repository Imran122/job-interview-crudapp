import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { signout } from "../../../../utilities/helper";
import { IoHome } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

import { useState } from "react";
const DashboardMenus = () => {
  let location = useLocation();
  let initialPart = location.pathname.split("/")[2];
  const [activeMenu, setActiveMenu] = useState(initialPart);
  const navigate = useNavigate();
  const { user, setUser, isLoading, setIsLoading } = useAuth();

  const handelNavigation = (path) => {
    location.pathname = path;
    navigate(`/dashboard${path}`);
    setActiveMenu(path);
  };

  const logout = () => {
    // setIsLoading(true);
    signout(() => {
      setUser("");
      navigate("/login", { replace: true });
    });
  };
  return (
    <div className="sidebar-menus">
      {user.role === "super-admin" && (
        <div
          onClick={() => handelNavigation("/")}
          className={`sidebar-menu ${activeMenu === "/" ? "menu-active" : ""}`}
        >
          <span className="menu-icon">
            <IoHome className="menuIcon" />
          </span>
          <p className="menu">Dashboard</p>
        </div>
      )}

      {user.role === "user" && (
        <div
          onClick={() => handelNavigation("/user-payment")}
          className={`sidebar-menu ${activeMenu === "/" ? "menu-active" : ""}`}
        >
          <span className="menu-icon">
            <IoHome className="menuIcon" />
          </span>
          <p className="menu">User Payment</p>
        </div>
      )}
      {user.role === "agent" && (
        <div
          onClick={() => handelNavigation("/agent-dashboard")}
          className={`sidebar-menu ${activeMenu === "/" ? "menu-active" : ""}`}
        >
          <span className="menu-icon">
            <IoHome className="menuIcon" />
          </span>
          <p className="menu">Agent Dashboard</p>
        </div>
      )}
      <div onClick={logout} className="sidebar-menu">
        <span className="menu-icon">
          <IoIosLogIn className="menuIcon" />
        </span>
        <p className="menu">
          Log out {user.name} | {user.role}
        </p>
      </div>
    </div>
  );
};

export default DashboardMenus;
