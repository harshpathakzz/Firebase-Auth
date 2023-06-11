import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
