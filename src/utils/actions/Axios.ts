import axios from "axios";
import { getAPI } from "../constants";

export default () => {
  if (localStorage.getItem("token"))
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );

  const client = axios.create({
    baseURL: getAPI(),
  });
  return client;
};
