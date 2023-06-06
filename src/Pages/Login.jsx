import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, handleGoogleLogin } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message); // Update error state
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
      navigate("/dashboard");
    } catch (error) {
      setError(error.message); // Update error state
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
