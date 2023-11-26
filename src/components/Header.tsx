import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const [statusUser, setUser] = useState("Guest");

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(localStorage.getItem("email") || "Guest");
    }, 1);

    return () => clearInterval(interval);
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
            {statusUser}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
