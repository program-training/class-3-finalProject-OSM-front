import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  const statusUser = localStorage.getItem("token");
  const isUserLoggedIn = !!statusUser;

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
            {isUserLoggedIn ? "User: User is logged in" : "User: Guest"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
