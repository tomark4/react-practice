import React from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { deleteTodoAction, setCompleteAction } from "../store/ducks/todosDucks";

const ListItem = ({ item, onEdit }) => {
  const dispatch = useDispatch();

  const deleteTodo = (item) => {
    dispatch(deleteTodoAction(item));
  };

  const completeTodo = (item) => {
    dispatch(setCompleteAction(item));
  };

  return (
    <>
      <li className="list-group-item">
        <h5>{item.id}</h5>
        <p className={item.completed ? "completado" : ""}>{item.title}</p>
        <div className="text-right">
          <div className="d-flex flex-start-end">
            <div href="" className="mx-2">
              <button onClick={() => onEdit(item)} className="btn btn-success">
                Edit
              </button>
            </div>
            <div href="" className="mx-2">
              <button
                className="btn btn-warning"
                onClick={() => completeTodo(item)}
              >
                Completed
              </button>
            </div>
            <div href="" className="mx-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(item)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ListItem;
