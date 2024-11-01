import React, { useState } from 'react';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';

const LoginSignupForm = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-300 via-teal-200 to-blue-300 px-6 py-8">
      <div
        className={`w-full max-w-md p-8 transition-all duration-700 transform bg-white rounded-2xl shadow-lg ${
          showSignUp ? 'scale-105 opacity-100' : 'scale-95 opacity-90'
        }`}
      >
        {/* Fancy form switch animation */}
        <div className="transition-opacity duration-500 ease-in-out">
          {showSignUp ? <SignUp /> : <SignIn />}
        </div>

        {/* Toggle link with fancy hover and animation */}
        <div className="mt-8 text-center text-sm font-medium text-gray-600 cursor-pointer flex items-center justify-center gap-1">
          <span className="transition-all duration-500 ease-in-out transform hover:scale-105">
            {showSignUp ? 'Already a member?' : 'Not a member?'}
          </span>
          <p
            onClick={() => setShowSignUp(!showSignUp)}
            className="pl-2 font-semibold leading-6 text-teal-600 hover:text-teal-800 hover:underline hover:scale-110 transition-all duration-300 ease-in-out"
          >
            {showSignUp ? 'Log In' : 'Sign Up'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
