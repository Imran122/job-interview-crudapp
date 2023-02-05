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
                  <th>Sr</th>
                  <th>Test ID</th>
                  <th>User UD</th>
                  <th>Date-Time</th>
                  <th>IQ score</th>
                  <th>Visual</th>
                  <th>Abstract</th>
                  <th>Pattern</th>
                  <th>Spatial</th>
                  <th>Analytic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>C0001</td>
                  <td>U0001</td>
                  <td>22/01/23 23:40</td>
                  <td>112</td>
                  <td>60%</td>
                  <td>40%</td>
                  <td>50%</td>
                  <td>80%</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>C0002</td>
                  <td>U0002</td>
                  <td>18/01/23 12:40</td>
                  <td>112</td>
                  <td>60%</td>
                  <td>40%</td>
                  <td>50%</td>
                  <td>80%</td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>003</td>
                  <td>C0003</td>
                  <td>U0003</td>
                  <td>22/01/23 08:40</td>
                  <td>112</td>
                  <td>60%</td>
                  <td>40%</td>
                  <td>50%</td>
                  <td>80%</td>
                  <td>30%</td>
                </tr>
              </tbody>
            </table>
            <nav className="d-flex lm-pagination">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" aria-label="Previous">
                    <BsChevronLeft />
                  </button>
                </li>
                <li className="page-item">
                  <button className="page-link lmp-active">1</button>
                </li>
                <li className="page-item">
                  <button className="page-link">2</button>
                </li>
                <li className="page-item">
                  <button className="page-link">3</button>
                </li>
                <li className="page-item">
                  <button className="page-link" aria-label="Next">
                    <BsChevronRight />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListComponent;
