import TaskService from "../../services/taskService";
import { FILE_ACTION_TYPES } from "./fileAction";

export const TASK_ACTION_TYPES = {
  CREATE: "TASK/CREATE",
  ADDFILE: "TASK/ADDFILE",
  UPDATE: "TASK/UPDATE",
  UPDATE_STATUS: "TASK/UPDATE_STATUS",
  UPDATE_TITLE: "TASK/UPDATE_TITLE",
  DELETE: "TASK/DELETE",
  GET_ALL: "TASK/GET_ALL",
  GET_TASK_IMPORTANT: "TASK/GET_TASK_IMPORTANT",
  SEARCH: "TASK/SEARCH",
  GET_BY_ID: "TASK/GET_BY_ID",
  SORT_BY_PREDICATE: "TASK/SORT_BY_PREDICATE",
};

export const getTasks = (userId) => (dispatch) => {
  return TaskService.getTasks(userId)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.GET_ALL,
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

export const getTasksImportant = (userId) => (dispatch) => {
  return TaskService.getTasks(userId)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.GET_TASK_IMPORTANT,
        payload: response.data.filter((x) => x.isImportant === true),
      });
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
    });
};

export const sortByPredicate = (userId, predicate) => (dispatch) => {
  return TaskService.sortByPredicate(userId, predicate)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.SORT_BY_PREDICATE,
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

export const getTask = (id) => (dispatch) => {
  return TaskService.getTask(id)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.GET_BY_ID,
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

export const search = (userId, searchString) => (dispatch) => {
  return TaskService.search(userId, searchString)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.SEARCH,
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

export const create = (newTask) => (dispatch) => {
  return TaskService.create(newTask)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.CREATE,
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

export const addFile = (taskId, file) => (dispatch) => {
  return TaskService.addFile(taskId, file)
    .then((response) => {
      dispatch({
        type: FILE_ACTION_TYPES.ADDFILE,
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

export const update = (updateTask) => (dispatch) => {
  return TaskService.update(updateTask)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.UPDATE,
        payload: response.data,
      });
      //return Promise.resolve();
    })
    .catch((error) => {
      dispatch({
        type: "ERROR",
        payload: error,
      });
      //return Promise.reject();
    });
};

export const remove = (id) => (dispatch) => {
  return TaskService.remove(id)
    .then((response) => {
      dispatch({
        type: TASK_ACTION_TYPES.DELETE,
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
