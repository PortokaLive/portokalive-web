import { createStore, applyMiddleware } from "redux";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
