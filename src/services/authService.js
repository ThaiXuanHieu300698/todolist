import api from "./api";

const AUTH_BASE_URL = "Users";

const login = async (email, password) => {
  let response;
  await api
    .post(AUTH_BASE_URL + "/authenticate", {
      email: email,
      password: password,
    })
    .then((res) => {
      response = res;
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      }
    });
  return response;
};

const register = async (newUser) => {
  let response;
  await api
    .post(AUTH_BASE_URL + "/register", newUser)
    .then((res) => {
      response = res;
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch((error) => {
      if (error.response) {
        response = error.response;
      }
    });

  return response;
};

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  register,
  logout,
};
