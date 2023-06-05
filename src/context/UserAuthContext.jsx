import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("User created:", user);
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error:", errorCode, errorMessage);
      // ..
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;
      console.log("User logged in:", user);
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error:", errorCode, errorMessage);
      // ..
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error:", errorCode, errorMessage);
      // ..
    }
  };

  // Add any additional authentication-related functions you need

  return (
    <userAuthContext.Provider
      value={{
        user,
        handleSignup,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
