import './App.css';
import React from "react";
import Todo from "./components/Todo";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
