import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContextProvider";

const InputTodo = () => {
  const { createTodo } = useContext(TodoContext);
  const [inputTodo, setInputTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(inputTodo);
    setInputTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 xl:mt-20 flex gap-2">
      <input
        type="text"
        value={inputTodo}
        placeholder="New task..."
        onChange={(e) => setInputTodo(e.target.value)}
        className="bg-[#fafafa] lg:px-4 lg:py-2 p-2 border outline-none rounded-md w-full focus:bg-white text-xl"
      />
      <button
        disabled={inputTodo.trim() === ""}
        type="submit"
        className="text-white bg-[#3E78AD] border-[#3E78AD] hover:bg-[#3E78AD]/90 hover:border-[#3E78AD]/90 px-3 py-1.5 text-base duration-300 border rounded-md hover:shadow-md disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
};

export default InputTodo;
