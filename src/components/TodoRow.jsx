import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContextProvider";
import UpdateTodo from "./UpdateTodo";
import { Icon } from "@iconify/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import Comments from "./Comments";

const TodoRow = ({ data }) => {
  const { deleteTodo } = useContext(TodoContext);
  const { id, user, details, completed, email } = data;
  const { userAuth } = useAuth();

  const todoCompleted = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      const newFields = { completed: !completed };
      await updateDoc(todoDoc, newFields);
    } catch (e) {
      console.log("Error updateing document", e);
    }
  };

  return (
    <div className="border py-4 px-4 lg:px-5  mb-3 rounded-lg bg-white">
      <div className="flex items-center flex-wrap gap-4">
        {userAuth?.email === email && (
          <div
            onClick={() => todoCompleted(id)}
            className={`h-4 w-[16px] border border-gray-400 rounded cursor-pointer ${
              completed ? "bg-white border-green-600" : "bg-transparent"
            }`}
          >
            <Icon
              icon="mingcute:check-2-fill"
              className={`w-4 h-4 ${completed ? "text-green-600" : "hidden"}`}
            />
          </div>
        )}

        <div className="grow">
          <div className="capitalize text-sm font-medium">{user}</div>
          <div className="leading-tight">{details}</div>
        </div>
        <div className="flex flex-row items-center w-full md:w-fit border-t pt-2.5 sm:border-none">
          <Comments path={`todos/${id}/comments`} todoId={id} />
          {userAuth?.email === email && (
            <>
              <UpdateTodo data={data} />
              <button
                onClick={() => deleteTodo(id)}
                className="px-2 hover:text-red-500 text-gray-500"
              >
                <Icon icon="mi:delete" className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoRow;
