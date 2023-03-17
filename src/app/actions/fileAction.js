import FileService from "../../services/fileService";

export const FILE_ACTION_TYPES = {
  ADDFILE: "FILE/ADDFILE",
  UPDATE: "FILE/UPDATE",
  DELETE: "FILE/DELETE",
  GET_ALL: "FILE/GET_ALL",
  GET_BY_ID: "FILE/GET_BY_ID",
  GET_BY_TASKID: "FILE/GET_BY_TASKID",
};

export const getFiles = () => (dispatch) => {
  return FileService.getFiles()
    .then((response) => {
      dispatch({
        type: FILE_ACTION_TYPES.GET_ALL,
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
  return FileService.getByTaskId(taskId)
    .then((response) => {
      dispatch({
        type: FILE_ACTION_TYPES.GET_BY_TASKID,
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
  return FileService.remove(id)
    .then((response) => {
      dispatch({
        type: FILE_ACTION_TYPES.DELETE,
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
