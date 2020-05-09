import { SET_CURRENT_USER } from "../actions/Types";
import { IAction } from "../../models/IAction";
import isEmpty from "is-empty";
import { IUser } from "../../models/IUser";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action: IAction<IUser>) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
