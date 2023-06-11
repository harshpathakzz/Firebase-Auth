import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";
import Protected from "./Pages/Protected";
import { Route, Routes } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
function App() {
  const { isLoggedIn } = useUserAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <DashBoard />
            </Protected>
          }
        />

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
