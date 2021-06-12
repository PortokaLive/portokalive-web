import axios from "axios";
import { getAPI } from "../constants";

export default (getUrl?: Function) => {
  if (!!getUrl && localStorage.getItem("api_video_token")) {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("api_video_token");
  }

  if (!getUrl && localStorage.getItem("token")) {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  }

  const client = axios.create({
    baseURL: !!getUrl ? getUrl() : getAPI(),
  });

  return client;
};
