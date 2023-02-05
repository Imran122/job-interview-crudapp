import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import "./authStyle.css";
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
const SignUp = () => {
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
  const options = [
    {
      value: "agent",
      label: "agent",
      name: "role",
    },
    {
      value: "user",
      label: "user",
      name: "role",
    },
  ];
  const [role, setRole] = useState({});
  const handleOnSelect = (e) => {
    const field = e.name;
    const value = e.value;
    const newData = { ...role };
    newData[field] = value;
    setRole(newData);
  };
  console.log(role);
  const [signupData, setSignupData] = useState({});
  const handelOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newsignupData = { ...signupData };
    newsignupData[field] = value;

    setSignupData(newsignupData);
  };
  const handelImage = async (e) => {
    const field = e.target.name;

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    const newsignupData = { ...signupData };
    newsignupData[field] = base64;

    setSignupData(newsignupData);
  };

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const handelLoginSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    const { name, email, password, profileImage } = signupData;
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    formData.append("role", JSON.stringify(role));
    console.log("formData", formData);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL_API}/api/signup`,
      data: formData,
    })
      .then((response) => {
        console.log("SIGNUP SUCCESS", response);

        if (response.insertedId) {
          event.target.reset();
        }
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response);
        setErrorMessage(error.response);
        // // setValues({ ...values, buttonText: 'Submit' });
        //setAuthError(error.response.data.error);
      });
  };
  return (
    <>
      <div className="loginPage-bg">
        <div className="login-body">
          <div className="row shadow-lg">
            <div className="col-md-6 d-none d-md-block">
              <div className="lGimg text-center">
                <p>Test your CRUD system</p>
              </div>
            </div>
            <div className="col-md-6 bg-white p-5">
              <h3 className="pb-3">User SignUp</h3>
              <div className="form-style">
                <form onSubmit={handelLoginSubmit}>
                  <div className="form-group pb-3">
                    <input
                      onBlur={handelOnBlur}
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      id="exampleInputEmail3"
                      required
                    />
                  </div>
                  <div className="form-group pb-3">
                    <input
                      onBlur={handelOnBlur}
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      id="exampleInputEmail1"
                      required
                    />
                  </div>
                  <div className="form-group pb-3">
                    <input
                      onBlur={handelOnBlur}
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      id="exampleInputPassword1"
                      required
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <input
                        type="file"
                        name="profileImage"
                        onBlur={handelImage}
                        id="file_upload"
                        accept="image/*"
                        required
                      />
                      <span className="pl-2 font-weight-bold">
                        upload profile
                      </span>
                    </div>

                    <div></div>
                  </div>
                  <div className="py-3 mx-auto">
                    <span className="pl-2 font-weight-bold">Select Role</span>
                    <Select
                      styles={customStyles}
                      options={options}
                      onChange={handleOnSelect}
                      className="select-option"
                    />
                  </div>
                  <div className="pb-2">
                    <button
                      type="submit"
                      className="btn btn-dark w-100 font-weight-bold mt-2"
                    >
                      SignUp
                    </button>
                  </div>
                </form>
                <div className="sideline">OR</div>
                <div>
                  <Link
                    to="/login"
                    className="btn btn-primary w-100 font-weight-bold mt-2"
                  >
                    <i className="fa fa-facebook" aria-hidden="true"></i> Go For
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
