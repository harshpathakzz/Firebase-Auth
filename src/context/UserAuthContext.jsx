import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
      console.log("User state changed:", user);
      console.log("isLoggedIn state changed:", isLoggedIn);
    });

    // Cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log("User created:", user);
    // ...
  };

  const handleLogin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    console.log("User logged in:", user);
    // ...
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    // Signed in with Google
    const user = userCredential.user;
    console.log("User logged in with Google:", user);
    // ...
  };

  const handleLogout = async () => {
    await signOut(auth);
    console.log("User logged out");
    // ...
  };

  // Save isLoggedIn state to local storage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Add any additional authentication-related functions you need

  return (
    <userAuthContext.Provider
      value={{
        user,
        isLoggedIn,
        handleSignup,
        handleLogin,
        handleGoogleLogin,
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
