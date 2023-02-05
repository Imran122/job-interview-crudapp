import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./UserList.css";

const UserListComponent = () => {
  return (
    <div className="dashboard-main">
      <div className="row">
        <div className="col col-12 col-lg-12">
          <div className="table-responsive box-div mt-4">
            <table className="table table-border align-items-center">
              <thead class="tbl-thead">
                <tr>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>C0001</td>
                  <td>U0001</td>
                  <td>22/01/23 23:40</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>C0002</td>
                  <td>U0002</td>
                  <td>18/01/23 12:40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListComponent;
