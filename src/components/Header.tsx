import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const [statusUser, setStatusUser] = useState(localStorage.getItem("email"));

  useEffect(() => {
    const handleStorageChange = () => {
      setStatusUser(localStorage.getItem("email"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: "space-between", paddingRight: "16px" }}
        >
          <Typography variant="h6" color="inherit" component="div">
            Order System
          </Typography>
          <Typography variant="h6" color="inherit" component="div">
            {statusUser ? `User: ${statusUser}` : "User: Guest"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
