import axios from "./Axios";
import { GLOBAL_ERRORS, LIVE_STREAMERS } from "./Types";
import store from "../store";
import { IError } from "../../models/IError";
import { AxiosError } from "axios";
import { getVideoAPI } from "../constants";

export const getToken = () => {
  axios(getVideoAPI)
    .post("/auth/api-key", {
      apiKey: localStorage.getItem("api_video_key"),
    })
    .then((res) => {
      localStorage.setItem("api_video_token", res.data.access_token);
      return res.data.access_token;
    })
    .catch((ex) => {
      console.error(ex);
    });
};

export const getLiveUsersDetails = (id: string) => {
  return axios(getVideoAPI)
    .get("/live-streams/" + id)
    .then((res) => {
      return res.data;
    })
    .catch(async (err: AxiosError) => {
      if (err?.response?.status === 401) {
        await getToken();
        return getLiveUsers();
      }
      store.dispatch({
        type: GLOBAL_ERRORS,
        payload: new IError(
          err.response?.status,
          err.response?.data.error,
          err.response?.data.message
        ),
      });
    });
};

export const getLiveUsers = () => {
  axios(getVideoAPI)
    .get("/live-streams")
    .then((res) => {
      store.dispatch({
        type: LIVE_STREAMERS,
        payload: res.data.data,
      });
    })
    .catch(async (err: AxiosError) => {
      if (err?.response?.status === 401) {
        await getToken();
        return getLiveUsers();
      }
      store.dispatch({
        type: GLOBAL_ERRORS,
        payload: new IError(
          err.response?.status,
          err.response?.data.error,
          err.response?.data.message
        ),
      });
    });
};
