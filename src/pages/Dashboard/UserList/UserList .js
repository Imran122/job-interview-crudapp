import { isElementType } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { getCookie } from "../../../utilities/helper";
import "./UserList.css";

const UserListComponent = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_API}/api/user-list`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserList(data));
  }, []);

  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col col-12 col-lg-12">
          <div className="table-responsive box-div mt-4">
            <table className="table table-border align-items-center">
              <thead class="tbl-thead">
                <tr>
                  <th>User Profile</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr>
                    <td>
                      {user.profileImage ? (
                        <img src={user.profileImage} className="tableImg" />
                      ) : (
                        <img
                          src="https://app.3schools.in/logo.png"
                          className="tableImg"
                        />
                      )}
                    </td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListComponent;
