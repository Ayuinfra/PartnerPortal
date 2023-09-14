import axios from "axios";

const BackendApi = axios.create({
  baseURL: "http://164.52.213.171:3002/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BackendApi;
