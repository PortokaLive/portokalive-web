import { GLOBAL_ERRORS } from "../actions/Types";
import { IAction } from "../../models/IAction";

export default function (state = new Error(), action: IAction<Error>) {
  switch (action.type) {
    case GLOBAL_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
