import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { isLoggedIn } = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        <Link to="/login">
          <button style={{ margin: "10px", padding: "5px" }}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={{ margin: "10px", padding: "5px" }}>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
