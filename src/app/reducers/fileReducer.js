import { FILE_ACTION_TYPES } from "../actions/fileAction";

const initialState = {
  list: [],
  files: [],
};

export const file = (state = initialState, action) => {
  switch (action.type) {
    case FILE_ACTION_TYPES.GET_ALL:
      return {
        ...state,
        list: [...action.payload],
      };

      case FILE_ACTION_TYPES.ADDFILE:
      return {
        ...state,
        list: [...state.list],
        files: [...action.payload.files]
      };

    case FILE_ACTION_TYPES.GET_BY_ID:
      return {
        ...state,
        list: action.payload,
      };

    case FILE_ACTION_TYPES.GET_BY_TASKID:
      return {
        ...state,
        list: [...state.list],
        files: [...action.payload],
      };

    case FILE_ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id !== action.payload),
        files: state.files.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};
