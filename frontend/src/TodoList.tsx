import * as React from "react";
import { TodoType } from "./todoContext";
import { TodoItem } from "./TodoItem";

type Props = {
  todoList: TodoType[];
};

export const TodoList = ({ todoList }: Props) => {
  return (
    <div className="todo-list">
      {todoList.map((item) => (
        <TodoItem key={item._id} item={item} />
      ))}
    </div>
  );
};
