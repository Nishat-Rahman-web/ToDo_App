import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../context/TodoContextProvider";
import { Icon } from "@iconify/react";
import useAuth from "../hooks/useAuth";
import UpdateComment from "./UpdateComment";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Comments = ({ path, todoId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [parent] = useAutoAnimate();

  const { addCommentToTodo, deleteComment } = useContext(TodoContext);
  const todosCommentsCollectionRef = collection(db, path);
  const todoCommentQuery = query(
    todosCommentsCollectionRef,
    orderBy("createdAt", "desc")
  );
  const { userAuth } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(todoCommentQuery, (snapshot) => {
      const updatedTodosComments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(updatedTodosComments);
    });

    return () => unsubscribe();
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    setNewComment("");

    const user = {
      name: userAuth.displayName,
      email: userAuth.email,
      comment: newComment,
    };

    addCommentToTodo(todoId, user);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="px-2 hover:text-blue-500 flex items-center gap-1 text-gray-500"
      >
        {comments?.length > 0 ? (
          <span className="inline-block text-sm">{comments?.length}</span>
        ) : (
          ""
        )}
        <Icon icon="iconamoon:comment-dots" className="w-5 h-5 " />
      </button>
      {openModal && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/20 grid place-items-center">
          <div className="w-11/12 lg:w-1/3 shadow-lg z-10 bg-white rounded-md absolute top-[100px] left-[50%] translate-x-[-50%]">
            <div className="px-4 pt-2.5 pb-2 border-b flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#464D52]">
                Add comment
              </h2>
              <div
                onClick={() => setOpenModal(false)}
                className="cursor-pointer"
              >
                <Icon
                  icon="ic:round-close"
                  className="w-6 h-6 text-[#464D52]"
                />
              </div>
            </div>
            <form className="p-4 flex gap-2" onSubmit={addComment}>
              <div className="grow">
                <input
                  type="text"
                  className="bg-[#fafafa] lg:px-4 lg:py-2 p-2 border outline-none rounded-md w-full focus:bg-white text-xl "
                  value={newComment}
                  placeholder="Add comment..."
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
              <button
                disabled={newComment.trim() === ""}
                type="submit"
                className="text-white bg-[#3E78AD] border-[#3E78AD] hover:bg-[#3E78AD]/90 hover:border-[#3E78AD]/90 px-3 py-1.5 text-base duration-300 border rounded-md hover:shadow-md disabled:opacity-50"
              >
                Add
              </button>
            </form>
            <div className="p-4 border-t" ref={parent}>
              {comments?.map((comment) => (
                <div key={comment.id} className="mb-2 relative">
                  <div className="bg-[#f0f2f5] px-4 py-2.5 rounded-xl flex justify-between">
                    <div>
                      <div className="font-medium text-sm capitalize">
                        {comment.user}{" "}
                      </div>
                      {comment.comment}
                    </div>
                    {userAuth?.email === comment.userEmail && (
                      <div className="flex items-center justify-center gap-3">
                        <UpdateComment data={comment} todoId={todoId} />
                        <button
                          onClick={() => deleteComment(todoId, comment.id)}
                          className=" hover:text-red-500 text-gray-500"
                        >
                          <Icon icon="mi:delete" className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
