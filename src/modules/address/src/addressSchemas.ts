import { boolean, number, object, string } from "yup";

/* eslint-disable import/prefer-default-export */
export const addressSchema = object().shape({
  receiverName: string().required("Receiver name is required"),
  receiverCountryCode: number()
    .required("Receiver country code is required")
    .typeError("Invalid receiver country code"),
  receiverPhoneNumber: number()
    .required("Receiver phone number is required")
    .typeError("Invalid receiver phone number"),
  addressLineOne: string().required("Address line one is required"),
  addressLineTwo: string().optional(),
  postcode: string().required("Postcode is required"),
  city: string().required("City is required"),
  state: object()
    .shape({
      id: number().required("State is required"),
      name: string().required("State is required"),
    })
    .typeError("State is required"),
  country: string().required("Country is required"),
  isDefault: boolean()
    .typeError("Invalid default option")
    .required("Default option is required"),
  tag: string().optional(),
});
