import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const addUserToCollection = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userObj = { ...user }; // Create a shallow copy of the user object
    await setDoc(userRef, userObj);
    console.log("User added to collection:", user);
  } catch (error) {
    console.error("Error adding user to collection:", error);
  }
};
