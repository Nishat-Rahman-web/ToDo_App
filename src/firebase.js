import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-CWPP_cil7N783BU49JKD5OTtFjrAE3Q",
  authDomain: "todo-app-ff128.firebaseapp.com",
  projectId: "todo-app-ff128",
  storageBucket: "todo-app-ff128.appspot.com",
  messagingSenderId: "1011726647568",
  appId: "1:1011726647568:web:da1857d669b34ae47b6595",
  measurementId: "G-JNJHHJL9RC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);