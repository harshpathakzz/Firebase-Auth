import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) =>
  isLoggedIn ? children : <Navigate to="/" replace />;

export default Protected;
