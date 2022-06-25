import React, { useState } from "react";

export const TodoInput = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onAdd(value);
  };

  return (
    <div className="input-block">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        value={value}
        className="input-block__input"
      />
      <button onClick={() => onAdd(value)} className="todo-item__btn create">
        Add
      </button>
    </div>
  );
};
