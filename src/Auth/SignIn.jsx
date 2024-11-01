import React, { useState } from "react";
import { auth } from "../firebase"; // Ensure you have Firebase setup
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors

    // Client-side validation
    if (!email || !password) {
      const validationErrors = [];
      if (!email) validationErrors.push("Email address is required.");
      if (!password) validationErrors.push("Password is required.");
      setErrors(validationErrors);
      return; // Exit early if validation fails
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful! Welcome back.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/"); // Redirect to home page after login
        }, 3000);
      })
      .catch((error) => {
        let newErrors = [];
        switch (error.code) {
          case "auth/invalid-email":
            newErrors.push("The email address is not valid.");
            break;
          case "auth/user-not-found":
            newErrors.push("No user found with this email address.");
            break;
          case "auth/wrong-password":
            newErrors.push("Incorrect password. Please try again.");
            break;
          default:
            newErrors.push("An error occurred. Please try again.");
        }
        setErrors(newErrors);
        toast.error("Login failed. Please check your email or password.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-indigo-400 px-6 py-8">
      <ToastContainer />
      <div className="w-full max-w-lg mx-auto bg-white border py-10 px-8 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-transform duration-700 transform hover:scale-105">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-lg">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 font-medium">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent font-bold">
              Log in to your account
            </span>
          </p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-lg py-2 px-4 mt-6 text-red-700 font-medium shadow-sm transition-opacity duration-700 ease-in-out">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={signIn} className="space-y-8 mt-10">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:ring-0 focus:border-purple-500 transition duration-500 ease-in-out outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg shadow-md focus:ring-0 focus:border-purple-500 transition duration-500 ease-in-out outline-none"
              />
              <Icon
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? "el:eye-open" : "el:eye-close"}
                className="w-4 h-4 hover:text-blue-500 text-gray-500 cursor-pointer absolute top-2/4 -translate-y-2/4 right-3"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="text-white bg-[#3E78AD] border-[#3E78AD] hover:bg-[#3E78AD]/90 px-3 py-1.5 text-base duration-300 border rounded-md hover:shadow-md w-full"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          Don't have an account?
          <Link to="/signup" className="text-[#3E78AD] hover:underline pl-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
