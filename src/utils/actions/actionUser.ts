import axios from "./Axios";
import jwt_decode from "jwt-decode";
import { GLOBAL_ERRORS, SET_CURRENT_USER } from "./Types";
import { IAuth } from "../../models/IAuth";
import store from "../store";
import { IError } from "../../models/IError";
import { AxiosError } from "axios";

export const registerUser = (userData: IAuth, history: any) => {
  axios()
    .post("/user/register", userData)
    .then(() => {
      loginUser(userData, history);
    })
    .catch((err: AxiosError) => {
      store.dispatch({
        type: GLOBAL_ERRORS,
        payload: new IError(
          err.response?.status || 500,
          err.response?.data.error,
          err.response?.data.message
        ),
      });
    });
};

export const loginUser = (userData: IAuth, history: any) => {
  axios()
    .post("/user/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      setCurrentUser(decoded);
      history.push("/");
    })
    .catch((err) => {
      store.dispatch({
        type: GLOBAL_ERRORS,
        payload: new IError(
          parseInt(err.code ? err.code : "500"),
          err.response?.data.error,
          err.response?.data.message
        ),
      });
    });
};

export const setCurrentUser = (user: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  setCurrentUser({});
};

export const deleteUser = (userData: IAuth) => {
  axios()
    .delete("/user/me", { data: userData })
    .then(() => {
      logoutUser();
    })
    .catch((err) => {
      store.dispatch({
        type: GLOBAL_ERRORS,
        payload: new IError(
          parseInt(err.code ? err.code : "500"),
          err.response?.data.error,
          err.response?.data.message
        ),
      });
    });
};