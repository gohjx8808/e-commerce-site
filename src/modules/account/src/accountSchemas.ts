/* eslint-disable import/prefer-default-export */
import { number, object, string } from "yup";

export const editAccountSchema = object().shape({
  name: string().required("Full name is required"),
  preferredName: string().optional(),
  gender: object()
    .shape({
      id: string().required("Gender is required"),
      name: string().required("Gender is required"),
    })
    .typeError("Gender is required"),
  countryCode: number()
    .required("Country code is reqired")
    .typeError("Invalid country code"),
  phoneNumber: number()
    .required("Phone number is required")
    .typeError("Invalid phone number"),
  dob: string().required("Date of birth is required"),
});
