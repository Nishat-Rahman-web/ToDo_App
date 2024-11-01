import React, { useContext } from "react";
import Navbar from "./Navbar";
import { TodoContext } from "../context/TodoContextProvider";
import InputTodo from "./InputTodo";
import TodoRow from "./TodoRow";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Todo = () => {
  const { todos } = useContext(TodoContext);
  const { userAuth } = useAuth();
  const navigate = useNavigate();
  const [parent] = useAutoAnimate();

  if (!userAuth.email) {
    navigate("/login");
    return;
  } 

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <InputTodo />
        <div className="mt-8" ref={parent}>
          {todos?.map((todo) => (
            <TodoRow data={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
