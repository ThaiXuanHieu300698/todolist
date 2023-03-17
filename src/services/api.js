import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:12345/api/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
