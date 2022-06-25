import * as React from "react";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todoList }) => {
  console.log('todoList', todoList);
  return (
    <div className="todo-list">
      {todoList.map((item) => (
        <TodoItem key={item._id} item={item} />
      ))}
    </div>
  );
};
