import Select from "react-select";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { getCookie } from "../../../utilities/helper";
import "./UserList.css";

const UserListComponent = () => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#eaecf0",

      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "#eaecf0",
      },
    }),
  };

  const [userList, setUserList] = useState([]);
  const { user, isLoading, setIsLoading } = useAuth();
  const [emailFilter, setEmailFilter] = useState([]);
  let [selectcategoryID, setCategoryID] = useState(0);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_API}/api/user-list`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList(data);
        setEmailFilter(data);
      });
  }, []);

  //filter system apply
  let uniquelList = [
    ...new Map(userList.map((item) => [item["email"], item])).values(),
  ];

  let emailListOptions = [];
  for (let index = 0; index < uniquelList.length; index++) {
    let element = uniquelList[index];
    emailListOptions.push({
      value: element.email,
      label: element.email,
      name: "email",
    });
  }

  const handleOnSelect = (e) => {
    const field = e.name;
    const value = e.value;
    const newData = { ...selectcategoryID };
    newData[field] = value;
    setIsLoading(true);

    if (field == "email") {
      //console.log("selectcategoryID.carMake", newData.carMake);

      let filterWiseList = userList.filter(
        (data) => data.email === newData?.email
      );

      setEmailFilter(filterWiseList);
      setIsLoading(false);
      if (filterWiseList.length === 0) {
        setEmailFilter(userList);
      }
    }
  };

  return (
    <div className="dashboard-main">
      <div>
        <div className="py-3 mx-auto col col-6">
          <span className="pl-2 font-weight-bold">Select Role</span>
          <Select
            styles={customStyles}
            options={emailListOptions}
            onChange={handleOnSelect}
            className="select-option"
          />
        </div>
      </div>
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
                {emailFilter.map((user) => (
                  <tr key={user._id}>
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
