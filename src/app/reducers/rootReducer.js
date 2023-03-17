import { combineReducers } from "redux";
import { task } from "./taskReducer";
import { step } from "./stepReducer";
import { auth } from "./authReducer";
import { file } from "./fileReducer";

export const rootReducer = combineReducers({
  task,
  step,
  auth,
  file,
});
