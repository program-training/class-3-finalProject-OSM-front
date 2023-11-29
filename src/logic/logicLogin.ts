import * as Yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { EmailData } from "../interface/loginInterface";

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

const FetchRecover: SubmitHandler<EmailData> = async (data) => {
  console.log(JSON.stringify(data));
  try {
    const response = await fetch(`https://osm-1-2.onrender.com/api/users/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

export { validationSchema, validationEmail, FetchRecover };
