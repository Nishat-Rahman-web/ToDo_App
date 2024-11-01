import React, { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Icon } from "@iconify/react";
import { TodoContext } from "../context/TodoContextProvider";

const UpdateTodoModal = ({ data }) => {
  const { updateTodo } = useContext(TodoContext);
  const { details, id } = data;
  const [openModal, setOpenModal] = useState(false);
  const [updateInput, setUpdateInput] = useState(details);

  const handleUpdate = (id) => {
    setOpenModal(false);
    updateTodo(id, updateInput);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="px-2 hover:text-blue-500 text-gray-500"
      >
        <Icon icon="bxs:edit" className="w-5 h-5" />
      </button>
      {openModal && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/20 grid place-items-center">
          <div className="w-11/12 lg:w-1/3 absolute top-[100px] left-[50%] translate-x-[-50%] shadow-lg z-10 bg-white rounded-md">
            <div className="px-4 pt-2.5 pb-2 border-b flex items-center">
              <h2 className="text-lg font-medium text-[#464D52]">Edit task</h2>
            </div>
            <form className="p-4" onSubmit={() => handleUpdate(id)}>
              <div className="mb-4">
                <input
                  type="text"
                  className="bg-[#fafafa] lg:px-4 lg:py-2 py-4 px-6 border outline-none rounded-md w-full focus:bg-white text-xl "
                  value={updateInput}
                  onChange={(e) => setUpdateInput(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setOpenModal(false)}
                  type="button"
                  className="mr-3 text-gray-500 bg-transparent border-gray-200 px-3 py-1.5 text-base duration-300 border rounded-md hover:shadow-md disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#3E78AD] border-[#3E78AD] hover:bg-[#3E78AD]/90 hover:border-[#3E78AD]/90 px-3 py-1.5 text-base duration-300 border rounded-md hover:shadow-md disabled:opacity-50"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTodoModal;
