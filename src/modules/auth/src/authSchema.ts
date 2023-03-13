import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.{8})/,
      "Password must contain minimum 8 characters | at least 1 alphabetical character | at least 1 number"
    ),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords do not match."),
  dob: yup.string().required("Date of birth is required"),
  gender: yup
    .object()
    .shape({
      id: yup.string().required("Gender is required"),
      name: yup.string().required("Gender is required"),
    })
    .typeError("Gender is required"),
  countryCode: yup
    .number()
    .required("Country code is required")
    .typeError("Invalid country code"),
  phoneNumber: yup
    .number()
    .required("Phone number is required")
    .typeError("Invalid phone number"),
  name: yup.string().required("Full name is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
