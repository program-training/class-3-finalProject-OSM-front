import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setStatus, setUser } from "../../redux/slices/userSlice";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validationSchema, validationEmail, FetchRecover } from "../../logic/logicLogin";
import { FormData } from "../../interface/loginInterface";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [titleDialog, setTitleDialog] = useState("Recover Password");
  const [messageDialog, setMessageDialogDialog] = useState("To recover the password, please enter your email address here.We will send a temporary password.");
  const [inputDialog, setInputDialog] = useState("Email");
  const [emailInput, setEmailInput] = useState<string>("");
  const [buttonDialog, setButtonDialogDialog] = useState("recover");
  const [typeDialog, setTypeDialog] = useState("email");
  const [loginError, setLoginError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      console.log(json);
      if (json.accessToken) {
        localStorage.setItem("token", json.accessToken);
        localStorage.setItem("user", data.email || "");
        localStorage.setItem("status", JSON.stringify(true));
        dispatch(setStatus(true));
        dispatch(setUser(data.email));
        navigate("/home");
      } else {
        setLoginError(json.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRecoverPassword = () => {
    if (buttonDialog === "recover" && validationEmail.isValidSync({ emailInput })) {
      setTitleDialog("Enter Password");
      setMessageDialogDialog("We sent you a temporary password to your email, enter it here");
      setInputDialog("Enter Password");
      setButtonDialogDialog("send");
      setTypeDialog("code");
      FetchRecover({ emailInput });
      console.log("AAA");
    } else console.log("BBB", emailInput);
  };

  const handleClickOpenForgotPassword = () => {
    setOpen(true);
  };

  const handleCloseForgotPassword = () => {
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
                <Link href="/register">Register</Link>
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={5}>
                <TextField {...register("email")} label="Email" error={!!errors.email} helperText={errors.email?.message && errors.email.message} />

                <TextField {...register("password")} label="Password" type="password" error={!!errors.password} helperText={errors.password?.message && errors.password.message} />
              </Stack>
              <Fragment>
                <Button variant="text" onClick={handleClickOpenForgotPassword}>
                  Forgot Password?
                </Button>
                <Dialog open={open} onClose={handleCloseForgotPassword}>
                  <form>
                    <DialogTitle>{titleDialog}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>{messageDialog}</DialogContentText>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={inputDialog}
                        type={typeDialog}
                        fullWidth
                        variant="standard"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseForgotPassword}>Cancel</Button>
                      <Button onClick={handleRecoverPassword}>{buttonDialog}</Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </Fragment>
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
