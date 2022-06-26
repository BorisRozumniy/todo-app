import { useState, useEffect } from "react";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";
import { todoUrl } from "./apiUrls";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoContext, TodoContextInterface, TodoType } from "./todoContext";

function App() {
  useEffect(() => {
    fetch(todoUrl)
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data);
      });
  }, []);

  const [todoList, setTodoList] = useState([] as TodoType[]);

  const updateTodo = (todo: TodoType) => {
    const url = `${todoUrl}${todo._id}`;

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "PATCH",
      body: JSON.stringify(todo),
    };

    let ok: boolean;

    fetch(url, config)
      .then((res) => {
        ok = res.ok;
        return res.json();
      })
      .then((data) => {
        if (!ok) return Promise.reject(data);

        let editingItem = {} as TodoType;
        const listWithChangedItem = todoList.map((todoItem) => {
          if (todoItem._id === data.editedTodo._id) {
            editingItem = { ...data.editedTodo };
            return editingItem;
          }
          return todoItem;
        });

        // NotificationManager.success("", data.message, 5000);
        setTodoList(listWithChangedItem);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // NotificationManager.error("", error.message, 5000);
      });
  };

  const addTodo = (value: TodoType["title"]) => {
    const newTodo = {
      title: value,
      isDone: false,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newTodo),
    };

    let ok: boolean;

    fetch(todoUrl, config)
      .then((res) => {
        ok = res.ok;
        return res.json();
      })
      .then((data) => {
        if (!ok) return Promise.reject(data);
        // NotificationManager.success("", data.message, 5000);
        setTodoList([...todoList, data.todo]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        // NotificationManager.error("", error.message, 5000);
      });
  };

  const renameTodo = (item: TodoType) => {
    const newTitle = prompt("Enter new title:", item.title);
    updateTodo({ ...item, title: newTitle || '' });
  };

  const removeTodo = (item: TodoType) => {
    const url = `${todoUrl}${item._id}`;
    const config = {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify(item),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        const filteredTodoList = todoList.filter(
          (todo) => todo._id !== data.deletedTodo._id
        );
        setTodoList(filteredTodoList);
        // NotificationManager.success("", data.message, 5000);
      });
  };

  const changeStatusTodo = (item: TodoType) => {
    updateTodo({ ...item, isDone: !item.isDone });
  };

  const todoContextValue: TodoContextInterface = {
    addTodo,
    updateTodo,
    renameTodo,
    removeTodo,
    changeStatusTodo,
  };

  return (
    <main>
      <TodoContext.Provider value={todoContextValue}>
        <TodoInput onAdd={addTodo} />
        <TodoList todoList={todoList} />
      </TodoContext.Provider>
      {/* <NotificationContainer /> */}
    </main>
  );
}

export default App;
