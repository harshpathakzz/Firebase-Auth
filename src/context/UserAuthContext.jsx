import { createContext } from "react";

const userAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  return (
    <userAuthContext.Provider value={{}}>{children}</userAuthContext.Provider>
  );
};
