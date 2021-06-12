import { LIVE_STREAMERS } from "../actions/Types";
import { IAction } from "../../models/IAction";

const initialState = {
  liveList: [] as any[],
};

export default function (state = initialState, action: IAction<[]>) {
  switch (action.type) {
    case LIVE_STREAMERS:
      return { ...state, liveList: [...action.payload] };
    default:
      return { ...state };
  }
}
