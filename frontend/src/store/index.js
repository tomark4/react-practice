import { combineReducers, createStore, applyMiddleware } from "redux";
import todosReducer from "./ducks/todosDucks";
import thunk from "redux-thunk";

const reducers = combineReducers({
  todos: todosReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
