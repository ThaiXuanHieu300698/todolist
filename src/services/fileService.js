import api from "./api";

const FILE_BASE_URL = "Files";

export const getByTaskId = async (taskId) => {
  let data;
  await api
    .get(`${FILE_BASE_URL}/${taskId}/files`)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      if (error.response) {
        data = error.response;
      }
    });

  return data;
};

export const getFiles = async () => {
  let data;
  await api
    .get(`${FILE_BASE_URL}`)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      if (error.response) {
        data = error.response;
      }
    });

  return data;
};

export const remove = async (id) => {
  let data;
  await api
    .delete(`${FILE_BASE_URL}/${id}`)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      if (error.response) {
        data = error.response;
      }
    });

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFiles,
  remove,
  getByTaskId,
};
