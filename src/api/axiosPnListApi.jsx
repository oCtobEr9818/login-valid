import axios from "axios";

const baseUrl = "https://essbackend.etica-inc.com/api/test/last_data/pn";

export const axiosPnListApi = async () => {
  const res = await axios.get(baseUrl);

  return res;
};
