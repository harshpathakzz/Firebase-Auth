import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
const DashBoard = () => {
  const { handleLogout } = useUserAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  const handelSubmit = () => {
    handleLogout();
    handleNavigate();
  };

  return (
    <>
      <h1>DashBoard</h1>
      <button onClick={handelSubmit}>Logout</button>
    </>
  );
};

export default DashBoard;
