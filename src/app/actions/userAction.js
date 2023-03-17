import UserService from "../../services/authService";
export const USER_ACTION_TYPES = {
  LOGIN: "USER/LOGIN",
  REGISTER: "USER/REGISTER",
  LOGOUT: "USER/LOGOUT",
  CREATE: "USER/CREATE",
  UPDATE: "USER/UPDATE",
  DELETE: "USER/DELETE",
  GET_ALL: "USER/GET_ALL",
  GET_BY_ID: "USER/GET_BY_ID",
};

export const login = (email, password) => (dispatch) => {
  return UserService.login(email, password)
    .then((response) => {
      dispatch({
        type: USER_ACTION_TYPES.LOGIN,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
};

export const register = (newUser) => (dispatch) => {
  return UserService.register(newUser)
    .then((response) => {
      dispatch({
        type: USER_ACTION_TYPES.REGISTER,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
};

export const logout = () => (dispatch) => {
  UserService.logout();
  dispatch({
    type: USER_ACTION_TYPES.LOGOUT,
    payload: null,
  });
};
