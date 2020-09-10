import React, { useState, useEffect } from "react";
import ListItem from "./components/ListItems";
import { connect, useDispatch } from "react-redux";
import {
  addTodoAction,
  editTodoAction,
  getTodos,
} from "./store/ducks/todosDucks";
import swal from "sweetalert";

function App({ todos }) {
  const [name, setName] = useState("");
  const [todo, setTodo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      updateTodo();
    } else {
      addTodo();
    }
  };

  const editHandler = (item) => {
    setTodo(item);
    setName(item.title);
    setModoEdicion(true);
  };

  const addTodo = () => {
    if (name.trim().length === 0) {
      swal("TODO APP", "write something", "warning");
      return;
    }
    dispatch(
      addTodoAction({
        id: Date.now(),
        title: name,
        completed: false,
      })
    );
    setName("");
    swal("TODO APP", "Save succesfully", "success");
  };

  const updateTodo = () => {
    dispatch(
      editTodoAction({
        ...todo,
        title: name,
      })
    );
    setName("");
    setTodo(null);
    setModoEdicion(false);
  };

  return (
    <div className="container">
      <h2>TODO'S APP</h2>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={submitHandler} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Write your task"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block" type="submit">
                {modoEdicion ? <span>Update</span> : <span>Add new</span>}
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          {todos.length ? (
            <ul className="list-group">
              {todos.map((item) => (
                <ListItem item={item} key={item.id} onEdit={editHandler} />
              ))}
            </ul>
          ) : (
            <div className="alert alert-info">Nothing to show</div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(App);
