import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/auth/LoginScreen";
import SignUpScreen from "./screens/auth/SignUpScreen";
import DashboardScreen from "./screens/dashboard/DashboardScreen";

function App() {
  return (

      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signUp" element={<SignUpScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>

  );
}

export default App;
