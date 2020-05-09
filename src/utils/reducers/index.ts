import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerError from "./reducerError";

export default combineReducers({
  auth: reducerAuth,
  errors: reducerError,
});
