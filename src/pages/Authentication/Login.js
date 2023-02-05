import axios from "axios";
import React, { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { authenticate, isAuth } from "../../utilities/helper";

import "./authStyle.css";
const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, setUser, isLoading, setIsLoading, setAuthError, authError } =
    useAuth();
  const location = useLocation();
  console.log("lo", loginData);
  const navigate = useNavigate();
  //taking input
  const handelOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;

    setLoginData(newLoginData);
  };

  //login system by form submit
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordAlert, setPasswordAllert] = useState("");

  const handelLoginSubmit = (event) => {
    event.preventDefault();

    const { email, password } = loginData;
    //password validation by condition
    if (password === undefined || email === undefined) {
      setErrorMessage("please fill the form");
    } else if (password.length < 6) {
      setPasswordAllert("Password must be minimum 6 characters");
    } else if (password.length > 6) {
      setPasswordAllert("");
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL_API}/api/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        const destination = location?.state?.from || "/";
        navigate(location?.state?.from || "/", { replace: true });
        setErrorMessage("");
        authenticate(response.data, () => {
          setUser(isAuth());
          setIsLoading(false);
          navigate("/dashboard", { replace: true });
          console.log("cookie local save ", isAuth());
        });
      })
      .catch((error) => {
        setErrorMessage(error);
        console.log("SIGN IN ERROR", error);
        // setValues({ ...values, buttonText: 'Submit' });
        //setAuthError(error.response.data.error);
      });
  };

  return (
    <div className="loginPage-bg">
      <div className="login-body">
        <div className="row shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <div className="lGimg text-center">
              <p>Test your CRUD system</p>
            </div>
          </div>
          <div className="col-md-6 bg-white p-5">
            <h3 className="pb-3">Admin Login</h3>
            <div className="form-style">
              <form onSubmit={handelLoginSubmit}>
                <div className="form-group pb-3">
                  <input
                    onBlur={handelOnBlur}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    id="exampleInputEmail1"
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
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <input name="" type="checkbox" value="" />
                    <span className="pl-2 font-weight-bold">Remember Me</span>
                  </div>
                  <div></div>
                </div>
                <div className="pb-2">
                  <button
                    type="submit"
                    className="btn btn-dark w-100 font-weight-bold mt-2"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="sideline">OR</div>
              <div>
                <Link
                  to="/signup"
                  className="btn btn-primary w-100 font-weight-bold mt-2"
                >
                  <i className="fa fa-facebook" aria-hidden="true"></i> Go For
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
