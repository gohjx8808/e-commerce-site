import { boolean, number, object, string } from "yup";

const shippingInfoSchema = object().shape({
  receiverName: string().required("Receiver name is required"),
  buyerEmail: string()
    .email("Invalid email")
    .required("Buyer email is required"),
  receiverCountryCode: number()
    .required("Receiver country code is required")
    .typeError("Invalid receiver country code"),
  receiverPhoneNumber: number()
    .required("Receiver phone number is required")
    .typeError("Invalid receiver phone number"),
  addressLineOne: string().required("Address line 1 is required"),
  addressLineTwo: string().optional(),
  postcode: string().required("Postcode is required"),
  city: string().required("City is required"),
  state: object()
    .shape({
      id: number().required("State is required"),
      name: string().required("State is required"),
    })
    .typeError("State is required"),
  country: string().oneOf(["Malaysia"]).required(),
  promoCode: string().optional(),
  note: string().optional(),
  addToAddressBook: boolean().required("Add to address book is required"),
  paymentMethod: string().required("Payment method is required"),
});

export default { shippingInfoSchema };
