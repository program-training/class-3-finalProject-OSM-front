import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const RootBox = styled(Box)({
  flexGrow: 1,
});

const TitleTypography = styled(Typography)({
  flexGrow: 1,
});

const UserContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const UserTypography = styled(Typography)({
  marginRight: 2,
});

const Header = () => {
  const [statusUser, setUser] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(localStorage.getItem("email") || "Guest");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setUser("Guest");
    navigate("/");
  };

  return (
    <RootBox>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between", paddingRight: "16px" }}>
          <TitleTypography variant="h6" color="inherit">
            Order System
          </TitleTypography>
          <UserContainer>
            <UserTypography variant="h6" color="inherit">
              {statusUser}
            </UserTypography>
            {statusUser !== "Guest" && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </UserContainer>
        </Toolbar>
      </AppBar>
    </RootBox>
  );
};

export default Header;
