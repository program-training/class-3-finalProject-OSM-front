import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

interface FormData {
  code: string;
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
});

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const EmailVerification = localStorage.getItem("EmailVerification");
    console.log(EmailVerification, data);

    try {
      const response = await fetch(`http://localhost:8080/api/users/comparepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: EmailVerification, code: data.code }),
      });
      const result = await response.json();
      navigate("/enterNewPassword");
    } catch (error) {
      navigate("/enterNewPassword");

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
        Enter New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
          <TextField {...register("code")} label="Password" fullWidth error={!!errors.code} helperText={errors.code?.message && errors.code.message} />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EnterNewPassword;
