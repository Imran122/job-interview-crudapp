import Select from "react-select";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Modal from "react-bootstrap/Modal";
import { getCookie } from "../../../utilities/helper";
import "./UserList.css";
import { GiConsoleController } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [dataFilter, setDataFilter] = useState([]);
  const [idFilter, setIdFilter] = useState([]);
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
        setDataFilter(data);
        setIdFilter(data);
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
  //id filter
  let idListOptions = [];
  for (let index = 0; index < userList.length; index++) {
    let element = userList[index];
    idListOptions.push({
      value: element._id,
      label: element._id,
      name: "_id",
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

      setDataFilter(filterWiseList);
      setIsLoading(false);
      if (filterWiseList.length === 0) {
        setDataFilter(userList);
      }
    }
    if (field == "_id") {
      //console.log("selectcategoryID.carMake", newData.carMake);

      let filterWiseList = userList.filter((data) => data._id === newData?._id);

      setDataFilter(filterWiseList);
      setIsLoading(false);
      if (filterWiseList.length === 0) {
        setDataFilter(userList);
      }
    }
  };
  //delete user code
  const userDelete = (id) => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_URL_API}/api/user-delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const remainingData = userList.filter(
            (restRequest) => restRequest._id !== id
          );

          setUserList(remainingData);
          setIsLoading(false);
        }
      });
  };

  //user Update
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState([]);
  const handleClose = () => setShow(false);

  const userUpdate = (id) => {
    setShow(true);

    fetch(`${process.env.REACT_APP_URL_API}/api/user-details/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserId(data));
  };
  console.log(userId);
  const navigate = useNavigate();
  const [updateuserData, setUpdateuserData] = useState([]);
  const handleOnType = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newData = { ...updateuserData };
    newData[field] = value;
    setUpdateuserData(newData);
  };

  const updateFunction = (e) => {
    setShow(false);
    setIsLoading(true);

    e.preventDefault();

    const datas = {
      id: userId._id,
      name: updateuserData.name,
      email: updateuserData.email,
    };

    const url = `${process.env.REACT_APP_URL_API}/api/user-update`;
    //update data by call api
    axios
      .put(url, datas, {
        headers: {
          // "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie("token")}`,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          navigate("/dashboard", { replace: true });
        } else if (response.status === 401) {
          navigate("/", { replace: true });
        }
      });
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
        <div className="py-3 mx-auto col col-6">
          <span className="pl-2 font-weight-bold">Select ID</span>
          <Select
            styles={customStyles}
            options={idListOptions}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataFilter.map((user) => (
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
                    <td>
                      <button
                        onClick={() => userDelete(user._id)}
                        className=" me-2 me-xl-4"
                      >
                        Delete
                      </button>

                      <div className="support-action">
                        {/* <td>
                                            <Form>
                                                <Form.Check 
                                                    type="switch"
                                                    id="custom-switch"
                                                />
                                            </Form>
                                        </td> */}
                        <td>
                          <span className="actionBtn">
                            <button
                              className="editBtn"
                              onClick={() => userUpdate(user._id)}
                            >
                              Edit
                            </button>
                          </span>
                        </td>
                        <form onSubmit={updateFunction}>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Edit data</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form>
                                <input
                                  className="form-control mb-2"
                                  name="email"
                                  placeholder="Email"
                                  onChange={handleOnType}
                                  defaultValue={userId.email}
                                />
                                <input
                                  className="form-control mb-2"
                                  name="name"
                                  placeholder="User name"
                                  onChange={handleOnType}
                                  defaultValue={userId.name}
                                />

                                <Modal.Footer>
                                  {/* <button
                                  className="closeBtn"
                                  onClick={handleClose}
                                >
                                  Close
                                </button> */}
                                  <button
                                    className="saveBtn"
                                    onClick={updateFunction}
                                  >
                                    Save
                                  </button>
                                </Modal.Footer>
                              </form>
                            </Modal.Body>
                          </Modal>
                        </form>
                      </div>
                    </td>
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
