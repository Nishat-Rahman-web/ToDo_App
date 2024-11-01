import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [userAuth, setUserAuth] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      }
    });

    return  unsubscribe;
  }, []);

  return { userAuth };
};

export default useAuth;
