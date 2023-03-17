import { USER_ACTION_TYPES } from "../actions/userAction";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    
    case USER_ACTION_TYPES.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ACTION_TYPES.REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
