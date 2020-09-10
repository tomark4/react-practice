import axios from "axios";

const initialState = [];

const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";
const COMPLETE_TODO = "COMPLETE_TODO";
const GET_TODOS = "GET_TODOS";

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [action.payload, ...state];
    }

    case EDIT_TODO: {
      return state.map((s) =>
        s.id === action.payload.id ? { ...action.payload } : s
      );
    }

    case DELETE_TODO: {
      return state.filter((s) => s.id !== action.payload.id);
    }

    case COMPLETE_TODO: {
      return state.map((s) =>
        s.id === action.payload.id ? { ...s, completed: !s.completed } : s
      );
    }

    case GET_TODOS: {
      return state.concat(action.payload);
    }

    default: {
      return state;
    }
  }
};

export const addTodoAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: ADD_TODO,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editTodoAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: EDIT_TODO,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodoAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: DELETE_TODO,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setCompleteAction = (data) => (dispatch) => {
  try {
    dispatch({
      type: COMPLETE_TODO,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTodos = () => (dispatch) => {
  try {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((resp) => {
      dispatch({ type: GET_TODOS, payload: resp.data });
    });
  } catch (err) {
    console.log(err);
  }
};
