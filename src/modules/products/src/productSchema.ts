import * as yup from "yup";

const shippingInfoSchema = yup.object().shape({
  receiverName: yup.string().required("Receiver name is required"),
  buyerEmail: yup
    .string()
    .email("Invalid email")
    .required("Buyer email is required"),
  receiverCountryCode: yup
    .number()
    .typeError("Receiver country code is required"),
  receiverPhoneNumber: yup
    .number()
    .typeError("Receiver phone number is required"),
  addressLineOne: yup.string().required("Address line 1 is required"),
  postcode: yup.number().typeError("Invalid postcode"),
  city: yup.string().required("City is required"),
  state: yup
    .object()
    .shape({
      id: yup.number().required("State is required"),
      name: yup.string().required("State is required"),
    })
    .typeError("State is required"),
  paymentMethod: yup.string().required("Payment method is required"),
});

export default { shippingInfoSchema };
