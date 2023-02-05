import cookie from "js-cookie";

// set in cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};
// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// set in localstorage
export const getLocalStorage = (key) => {
  console.log("key", key);
  if (window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};
// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
// authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.token);
  setLocalStorage("user", response.user);
  next();
};
// access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    if (getCookie("token")) {
      const cookieChecked = getCookie("token");
      if (cookieChecked && cookieChecked != "undefined") {
        if (
          localStorage.getItem("user") &&
          localStorage.getItem("user") != "undefined"
        ) {
          return JSON.parse(localStorage.getItem("user"));
        }
      }
    }
  }
  return false;
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

export const updateUser = (response, next) => {
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response;

    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
