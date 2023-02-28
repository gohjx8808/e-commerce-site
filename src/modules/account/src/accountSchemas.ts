/* eslint-disable import/prefer-default-export */
import { number, object, string } from "yup";

export const editAccountSchema = object().shape({
  name: string().required('Full name is required'),
  gender: object().shape({
    id: string().required('Gender is required'),
    name: string().required('Gender is required'),
  }).typeError('Gender is required'),
  phoneNumber: number().required().typeError('Invalid phone number'),
  dob: string().required('Date of birth is required'),
});


