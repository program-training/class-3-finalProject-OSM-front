import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import { CssBaseline } from "@mui/material";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import { CustomersTable } from "./components/CustomersTable";

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
            <Route path="/a" element={<CustomersTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
