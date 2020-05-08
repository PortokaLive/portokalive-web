import { createStore, applyMiddleware, compose } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

type RootState = ReturnType<typeof rootReducer>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

const initialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState, compose(
        applyMiddleware(...middleware)
    )
);

export default store;