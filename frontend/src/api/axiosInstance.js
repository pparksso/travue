import axios from "axios";

const request = axios.create({
  // headers: {
  //   "Access-Control-Allow-Origin": "http://localhost:3000",
  // },
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
export default request;
