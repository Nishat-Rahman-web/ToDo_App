import React from "react";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { userAuth } = useAuth();
  const navigate = useNavigate();

  const userSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todo</h1>
        <div className="flex items-center gap-3 relative group">
          <div className="font-medium text-zinc-500 capitalize">
            Hi, {userAuth?.displayName}
          </div>
          <div className="h-8 w-8 bg-[#eaeaea] rounded-full grid place-items-center overflow-hidden">
            <Icon
              icon="fa6-solid:user"
              className="h-6 w-6 text-[#adadad] mb-[-10px]"
            />
          </div>
          <div className="absolute top-[10px] right-0 pt-8 group-hover:inline-block hidden">
            <div
              onClick={userSignOut}
              className="border rounded-lg py-2 px-4 shadow-md cursor-pointer bg-white hover:bg-gray-100 z-20"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
