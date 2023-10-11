import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000", // https://essbackend.etica-inc.com
  withCredentials: true,
});
