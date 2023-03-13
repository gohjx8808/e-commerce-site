import { boolean, number, object, string } from "yup";

/* eslint-disable import/prefer-default-export */
export const addressSchema = object().shape({
  receiverName: string().required("Receiver name is required"),
  receiverCountryCode: number().typeError("Receiver country code is required"),
  receiverPhoneNumber: number().typeError("Receiver phone number is required"),
  addressLineOne: string().required("Address line one is required"),
  postcode: number().typeError("Invalid postcode"),
  city: string().required("City is required"),
  state: object()
    .shape({
      id: string().required("State is required"),
      name: string().required("State is required"),
    })
    .typeError("State is required"),
  country: string().required("Country is required"),
  isDefault: boolean()
    .typeError("Invalid default option")
    .required("Default option is required"),
});
