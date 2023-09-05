import axios from "axios";

export default axios.create({
  baseURL: "https://essbackend.etica-inc.com", // https://essbackend.etica-inc.com
  withCredentials: true,
});
