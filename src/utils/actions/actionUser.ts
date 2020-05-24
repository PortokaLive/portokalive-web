import axios from "./Axios";
import jwt_decode from "jwt-decode";
import {
  GLOBAL_ERRORS,
  SET_CURRENT_USER,
  ACTIVATION_REQUIRED,
  GLOBAL_SUCCESS,
} from "./Types";
import { IAuth } from "../../models/IAuth";
import store from "../store";
import { IError } from "../../models/IError";
import { AxiosError } from "axios";
import { ISuccess } from "../../models/ISuccess";

export const registerUser = (userData: IAuth, history: any) => {
  axios()
    .post("/user/register", userData)
    .then((res) => {
      const { result: message } = res.data;
      store.dispatch({
        type: GLOBAL_SUCCESS,
        payload: {
          name: "Thank you for registering",
          message,
        } as ISuccess,
      });
      history.push("/login");
    })
    .catch((err: AxiosError) => {
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

export const sendActivationEmail = (email: string) => {
  axios()
    .post("/user/sendActivationEmail", { email })
    .then((res) => {
      store.dispatch({
        type: GLOBAL_SUCCESS,
        payload: {
          name: `Thank you`,
          message: `Another activation email has been sent to ${email}`,
        } as ISuccess,
      });
    })
    .catch((err) => {
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

export const activateAccount = (email: string, activationCode: string) => {
  axios()
    .post("/user/activate", { email, activationCode })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwt_decode(token);
      setTimeout(() => {
        setCurrentUser(decoded);
      }, 1000);
    })
    .catch((err) => {
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
      if (err.response?.data.error === ACTIVATION_REQUIRED) {
        store.dispatch({
          type: GLOBAL_SUCCESS,
          payload: {
            name: "Sorry",
            message:
              "You have not activated your account yet.<br/>" +
              "Please check your email to activate.<br/><br/>" +
              `<small >Click <a href='/send-activation?email=${userData.email}' target='_blank'>here</a> to send another activation email again.</small>`,
          } as ISuccess,
        });
      } else {
        store.dispatch({
          type: GLOBAL_ERRORS,
          payload: new IError(
            err.response?.status,
            err.response?.data.error,
            err.response?.data.message
          ),
        });
      }
    });
};

export const setCurrentUser = (user: any) => {
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  setCurrentUser({});
};
