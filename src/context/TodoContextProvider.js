import React, { createContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

export const TodoContext = createContext(null);

const TodoContextProvider = ({ children }) => {
  const { userAuth } = useAuth();
  const [todos, setTodos] = useState([]);

  const todosCollectionRef = collection(db, "todos");
  const todosQuery = query(todosCollectionRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(updatedTodos);
    });

    return () => unsubscribe();
  }, []);

  const createTodo = async (inputTodo) => {
    try {
      await addDoc(todosCollectionRef, {
        user: userAuth.displayName,
        email: userAuth.email,
        details: inputTodo,
        completed: false,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const deleteTodo = async (id) => {
    const todosDoc = doc(db, "todos", id);
    try {
      await deleteDoc(todosDoc);
    } catch (e) {
      console.log("Error deleteing document: ", e);
    }
  };

  const updateTodo = async (id, updateInput) => {
    try {
      const todoDoc = doc(db, "todos", id);
      const newFields = { details: updateInput };
      await updateDoc(todoDoc, newFields);
    } catch (e) {
      console.log("Error updateing document", e);
    }
  };

  const addCommentToTodo = async (todoId, user) => {
    const todoDocRef = doc(db, "todos", todoId);
    const commentsCollectionRef = collection(todoDocRef, "comments");
    try {
      await addDoc(commentsCollectionRef, {
        comment: user.comment,
        createdAt: serverTimestamp(),
        user: user.name,
        userEmail: user.email,
      });
    } catch (e) {
      console.log("Error adding comment to ID: ", todoId);
    }
  };

  const deleteComment = async (todoId, commentId) => {
    const todoDocRef = doc(db, "todos", todoId);
    const commentsDocRef = doc(todoDocRef, "comments", commentId);
    try {
      await deleteDoc(commentsDocRef);
    } catch (e) {
      console.log("Error deleteing document: ", e);
    }
  };

  const updateTodoComment = async (todoId, updateInput, commentId) => {
   try {
     const newFields = { comment: updateInput };
     const todoDocRef = doc(db, "todos", todoId);
     const commentsDocRef = doc(todoDocRef, "comments", commentId);
     await updateDoc(commentsDocRef, newFields);
   } catch (e) {
     console.log("Error updating document", e);
   }
 };

  const contextValue = {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
    addCommentToTodo,
    deleteComment,
    updateTodoComment,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

export default TodoContextProvider;

// fetch once from firebase

// useEffect(() => {
//   const getTodos = async () => {
//     const data = await getDocs(todosCollectionRef);
//     setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   };

//   getTodos();
// }, []);
