import * as Yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { ForgotPasswordData } from "../interface/loginInterface";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

const validationEmail = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Enter a valid email"),
});

const FetchRecover: SubmitHandler<ForgotPasswordData> = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.valueInput }),
    });
    console.log("BodyFetch1: ", JSON.stringify({ email: data.valueInput }));
    const result = await response.text();
    console.log(result);
    localStorage.setItem("EmailVerification", data.valueInput);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

const FetchComparePassword: SubmitHandler<ForgotPasswordData> = async (data) => {
  const EmailVerification = localStorage.getItem("EmailVerification");
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/comparepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: EmailVerification, code: data.valueInput }),
    });
    console.log("BodyFetch2", JSON.stringify({ email: EmailVerification, code: data.valueInput }));
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

const FetchResetPassword: SubmitHandler<ForgotPasswordData> = async (data) => {
  const EmailVerification = localStorage.getItem("EmailVerification");
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}users/resetpaasword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: EmailVerification, code: data.valueInput }),
    });
    console.log("BodyFetch3", JSON.stringify({ email: EmailVerification, password: data.valueInput }));
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

export { validationSchema, validationEmail, FetchRecover, FetchComparePassword, FetchResetPassword };
