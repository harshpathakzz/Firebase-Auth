import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../functions/authFunctions";
const DashBoard = () => {
  const { user } = useUserAuth();
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
      <p>Welcome {user.email}</p>
      <button onClick={handelSubmit}>Logout</button>
    </>
  );
};

export default DashBoard;
