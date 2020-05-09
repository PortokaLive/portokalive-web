import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerError from "./reducerError";
import reducerSuccess from "./reducerSuccess";

export default combineReducers({
  auth: reducerAuth,
  error: reducerError,
  success: reducerSuccess
});
