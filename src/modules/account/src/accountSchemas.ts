/* eslint-disable import/prefer-default-export */
import { number, object, string } from "yup";

export const editAccountSchema = object().shape({
  name: string().required('Full name is required'),
  gender: object().shape({
    label: string().required('Gender is required'),
    value: string().required('Gender is required'),
  }).typeError('Invalid gender'),
  phoneNumber: number().required().typeError('Invalid phone number'),
  dob: string().required('Date of birth is required'),
});


