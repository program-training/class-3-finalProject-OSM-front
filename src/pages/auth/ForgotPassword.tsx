import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const validationEmail = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter a valid email"),
});

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationEmail),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await response.text();
      console.log(result);
      localStorage.setItem("EmailVerification", data.email);
      navigate("/enterPasswordEmail");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h5" mb={3}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
          <TextField {...register("email")} label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message && errors.email.message} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Confirmation Email
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword;
