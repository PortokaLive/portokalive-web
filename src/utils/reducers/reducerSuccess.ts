import { GLOBAL_SUCCESS } from "../actions/Types";
import { IAction } from "../../models/IAction";
import { ISuccess } from "../../models/ISuccess";

export default function (
  state: ISuccess = { name: "", message: "" },
  action: IAction<ISuccess>
) {
  switch (action.type) {
    case GLOBAL_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
