import { combineReducers } from "redux";
import reducerAuth from "./reducerAuth";
import reducerError from "./reducerError";
import reducerSuccess from "./reducerSuccess";
import reducerLive from "./reducerLive";

export default combineReducers({
  auth: reducerAuth,
  streams: reducerLive,
  error: reducerError,
  success: reducerSuccess,
});
