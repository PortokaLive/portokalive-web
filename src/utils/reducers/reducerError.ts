import { GLOBAL_ERRORS } from "../actions/Types";
import { IAction } from "../../models/IAction";
import { IError } from "../../models/IError";

export default function (
  state = new IError(0, "", ""),
  action: IAction<IError>
) {
  console.log(state);
  switch (action.type) {
    case GLOBAL_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
