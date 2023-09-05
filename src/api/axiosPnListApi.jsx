import axios from "axios";

export default axios.create({
  baseURL: "https://essbackend.etica-inc.com/api/v2",
  withCredentials: true,
});
