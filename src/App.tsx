import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import { CssBaseline } from "@mui/material";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

function App() {


  return (
    <>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/a" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
