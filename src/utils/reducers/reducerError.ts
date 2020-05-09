import { GLOBAL_ERRORS } from "../actions/Types";
import { IAction } from "../../models/IAction";
import { IError } from "../../models/IError";

export default function (
  state = new IError(0, "", ""),
  action: IAction<IError>
) {
  switch (action.type) {
    case GLOBAL_ERRORS:
      if(!action.payload.name) {
        action.payload.name = "SERVER_ERROR";
      }
      if(!action.payload.message) {
        action.payload.message = "Unable to connect to server"
      }
      return action.payload;
    default:
      return state;
  }
}
