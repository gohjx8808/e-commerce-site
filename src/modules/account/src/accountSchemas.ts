/* eslint-disable import/prefer-default-export */
import { object, string } from "yup";

export const editAccountSchema = object().shape({
  name: string().required("Full name is required"),
  preferredName:string().optional(),
  gender: object()
    .shape({
      id: string().required("Gender is required"),
      name: string().required("Gender is required"),
    })
    .typeError("Gender is required"),
    countryCode:string().required("Country code is reqired"),
  phoneNumber: string().required("Phone number is required"),
  dob: string().required("Date of birth is required"),
});
