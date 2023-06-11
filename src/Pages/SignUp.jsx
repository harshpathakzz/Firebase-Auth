import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { handleSignup, isLoggedIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate("/dashboard");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleSignup(email, password);
      navigate("/login");
    } catch (error) {
      let errorMessage = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error";
          break;
        default:
          errorMessage = error.message;
          break;
      }

      setError(errorMessage);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p>{error}</p>} {/* Render error message if error exists */}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            autoComplete="false"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
