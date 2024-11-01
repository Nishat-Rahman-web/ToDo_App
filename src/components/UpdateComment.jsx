import { Icon } from "@iconify/react";
import React, { useContext, useState} from "react";
import { TodoContext } from "../context/TodoContextProvider";


const UpdateComment = ({ data, todoId }) => {
  const { comment, id } = data;
  const [inputComment, setInputComment] = useState(comment);
  const [openEditForm, setOpenEditForm] = useState(false);
  const { updateTodoComment } = useContext(TodoContext);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTodoComment(todoId, inputComment, id);
      setOpenEditForm(false);
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

   const handleButtonClick = () => {
     setOpenEditForm(!openEditForm);
   };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="hover:text-blue-500 text-gray-500"
      >
        <Icon icon="bxs:edit" className="w-5 h-5" />
      </button>
      {openEditForm && (
        <form
          onSubmit={handleUpdate}
          className="absolute top-0 left-0 w-full h-full bg-[#f0f2f5] px-4 py-2.5 rounded-xl flex gap-2"
        >
          <input
            type="text"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            className="grow bg-transparent outline-none"
          />
          <div className="flex gap-1 items-center">
            <button
              type="button"
              onClick={() => setOpenEditForm(false)}
              className="px-2.5 py-1 rounded-lg font-medium"
            >
              <Icon icon="ic:round-close" className="w-5 h-5 text-[#464D52]" />
            </button>
            <button
              type="submit"
              className="bg-[#3E78AD] border-[#3E78AD] px-2.5 py-1 rounded-lg text-white hover:bg-[#3E78AD]/90"
            >
              <Icon icon="iconamoon:send" className="w-5 h-5" />
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateComment;
