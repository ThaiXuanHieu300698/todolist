import { STEP_ACTION_TYPES } from "../actions/stepAction";

const initialState = {
  list: [],
  steps: [],
};

export const step = (state = initialState, action) => {
  switch (action.type) {
    case STEP_ACTION_TYPES.GET_ALL:
      return {
        ...state,
        list: [...action.payload],
      };

    case STEP_ACTION_TYPES.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        steps: [...state.steps, action.payload],
      };

    case STEP_ACTION_TYPES.GET_BY_TASKID:
      return {
        ...state,
        list: [...state.list],
        steps: [...action.payload],
      };

    case STEP_ACTION_TYPES.UPDATE:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id === action.payload.id ? action.payload : x
        ),
        steps: state.steps.map((x) =>
          x.id === action.payload.id ? action.payload : x
        ),
      };

    case STEP_ACTION_TYPES.DELETE:
      return {
        ...state,
        list: state.list.filter((x) => x.id !== action.payload),
        steps: state.steps.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};
