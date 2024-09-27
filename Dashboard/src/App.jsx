import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import Homepage from "./components/Homepage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/update-password/:token" element={<ResetPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;
