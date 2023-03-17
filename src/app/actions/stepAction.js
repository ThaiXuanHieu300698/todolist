import StepService from "../../services/stepService";

export const STEP_ACTION_TYPES = {
  CREATE: "STEP/CREATE",
  UPDATE: "STEP/UPDATE",
  DELETE: "STEP/DELETE",
  GET_ALL: "STEP/GET_ALL",
  GET_BY_ID: "STEP/GET_BY_ID",
  GET_BY_TASKID: "STEP/GET_BY_TASKID",
};

export const create = (newStep) => (dispatch) => {
  return StepService.create(newStep)
    .then((response) => {
      dispatch({
        type: STEP_ACTION_TYPES.CREATE,
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

export const getSteps = () => (dispatch) => {
  return StepService.getSteps()
    .then((response) => {
      dispatch({
        type: STEP_ACTION_TYPES.GET_ALL,
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

export const getByTaskId = (taskId) => (dispatch) => {
  return StepService.getByTaskId(taskId)
    .then((response) => {
      dispatch({
        type: STEP_ACTION_TYPES.GET_BY_TASKID,
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

export const update = (step) => (dispatch) => {
  return StepService.update(step)
    .then((response) => {
      dispatch({
        type: STEP_ACTION_TYPES.UPDATE,
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

export const remove = (id) => (dispatch) => {
  return StepService.remove(id)
    .then((response) => {
      dispatch({
        type: STEP_ACTION_TYPES.DELETE,
        payload: id,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
};
