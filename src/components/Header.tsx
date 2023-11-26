// import { useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../main";
// import { setUser } from "../redux/slices/userSlice";

// const Header = () => {
//   const dispatch = useDispatch();
//   // const userStatus = useSelector((state: RootState) => state.user.status);
//   const userName = useSelector((state: RootState) => state.user.user);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedStatus = localStorage.getItem("status");

//     if (storedUser && storedStatus) {
//       dispatch(setUser(storedUser));
//     }

//   }, [dispatch]);


//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar sx={{ background: "#121858" }} position="static">
//         <Toolbar variant="dense">
//           <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" component="div">
//             {userName}
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Header;
//------------------------------
import { AppBar, Box, Toolbar, Typography, MenuItem, Button, Badge } from "@mui/material";

import { useState, useEffect } from "react";


import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../main";
import { useNavigate } from "react-router-dom";
import UserCircle from "./UserCircle"


export default function Header() {
  const navigate = useNavigate();
  const [statusUser, setStatusUser] = useState(false);
  const userStatus = useSelector((state:RootState) => state.user.status);

  useEffect(() => {
    setStatusUser(userStatus);
  }, [userStatus]);
  return (
    <Box sx={{ flexGrow: 1, minHeight: "0px" }}>
      <AppBar position="static" sx={{ background: "white" }}>
        <Toolbar sx={{ background: "" }}>
          <Typography color="primary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Order Management
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <UserCircle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}