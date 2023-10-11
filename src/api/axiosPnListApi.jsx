import axios from "axios";

export default axios.create({
  baseURL: "https://essbackend.etica-inc.com/api/test/last_data",
  withCredentials: true,
});
