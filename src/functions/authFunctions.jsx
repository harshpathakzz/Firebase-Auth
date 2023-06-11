import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const handleSignup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log("User created:", user);
  // ...
};

export const handleLogin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log("User logged in:", user);
  // ...
};

export const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  console.log("User logged in with Google:", user);
  // ...
};

export const handleLogout = async () => {
  await signOut(auth);
  localStorage.removeItem("isLoggedIn");
  console.log("User logged out");
  // ...
};

export const listenToAuthChanges = (setUser, setIsLoggedIn) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setIsLoggedIn(!!user);
    console.log("User state changed:", user);
  });

  return unsubscribe;
};
