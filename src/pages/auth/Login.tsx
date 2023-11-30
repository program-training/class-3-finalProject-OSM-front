import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus, setUser } from "../../redux/slices/userSlice";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

interface FormData {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
console.log(data);

      const json = await response.json();

      console.log(json);
      if (json.accessToken) {
        localStorage.setItem("token", json.accessToken);
        localStorage.setItem("user", data.email || "");
        localStorage.setItem("status", JSON.stringify(true));
        dispatch(setStatus(true));
        dispatch(setUser(data.email));
        navigate("/osm/home");
      } else {
        setLoginError(json.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/enterPasswordEmail");
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "50vw",
            px: 30,
            py: "1%",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={5} sx={{ mb: 3 }}>
              <Typography variant="h3">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don't have an account?
                <Link href="/oms/register">Register</Link>
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={5}>
                <TextField
                  {...register("email")}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message && errors.email.message}
                />

                <TextField
                sx={{background:"#e3f2fd"}}
                  {...register("password")}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password?.message && errors.password.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment  position="end">
                        <Button
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <React.Fragment>
                <Button variant="text" onClick={handleClickOpen}>
                  Forgot Password?
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Recover Password</DialogTitle>
                  <DialogContent>
                    <DialogContentText>To recover the password, please enter your email address here.We will send a temporary password.</DialogContentText>
                    <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleForgotPassword}>recover</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Continue
              </Button>
            </form>
            <p>{loginError}</p>
          </div>
        </Box>
        <Box
          sx={{
            height: "100vh",
            px: 20,
            py: "10%",
            width: "50vw",
            background: " radial-gradient(50% 50% at 50% 50%, rgb(18, 38, 71) 0%, rgb(9, 14, 35) 100%)",
          }}
        >
          <img src="https://material-kit-react.devias.io/assets/auth-illustration.svg" alt="" />
        </Box>
      </Box>
    </>
  );
};

export default Login;
