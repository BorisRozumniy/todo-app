import { createContext } from "react";

export type TodoType = {
  title: string;
  isDone: boolean;
  _id: string;
};

export interface TodoContextInterface {
  updateTodo: (todo: TodoType) => void;
  addTodo: (v: TodoType["title"]) => void;
  renameTodo: (todo: TodoType) => void;
  removeTodo: (todo: TodoType) => void;
  changeStatusTodo: (todo: TodoType) => void;
}

export const TodoContext = createContext<TodoContextInterface | null>(null);
