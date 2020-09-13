import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import todosReducer from "./ducks/todosDucks";
import userReducer from "./ducks/user";
import thunk from "redux-thunk";
import { loadState, saveState } from "../utils/localStorage";

const reducers = combineReducers({
  todos: todosReducer,
  user: userReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistedState = loadState();

export const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  const { token, identity } = store.getState().user;
  saveState({
    user: {
      token,
      identity,
    },
  });
});
