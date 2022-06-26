import React, { useContext } from "react";
import { TodoContext, TodoType } from "./todoContext";

type Props = {
  item: TodoType;
};

export const TodoItem = ({ item }: Props) => {
  const context = useContext(TodoContext);
  return (
    <div className="todo-list__item">
      <span className="todo-item__text">{item.title}</span>
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => context?.changeStatusTodo(item)}
        className="todo-item__status"
      />
      <button
        onClick={() => context?.renameTodo(item)}
        className="todo-item__btn edit"
      >
        Edit
      </button>
      <button
        onClick={() => context?.removeTodo(item)}
        className="todo-item__btn remove"
      >
        Remove
      </button>
    </div>
  );
};
