import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import { CssBaseline } from "@mui/material";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EnterPasswordEmail from "./pages/auth/EnterPasswordEmail";
import EnterNewPassword from "./pages/auth/EnterNewPassword";


function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter basename="/oms">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/enterPasswordEmail" element={<EnterPasswordEmail />} />
            <Route path="/enterNewPassword" element={<EnterNewPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
