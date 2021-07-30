import * as yup from 'yup';

const shippingInfoSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNo: yup.number().typeError('Phone number is required'),
  addressLine1: yup.string().required('Address line 1 is required'),
  postcode: yup.number().typeError('Invalid postcode'),
  city: yup.string().required('City is required'),
  state: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }).typeError('State is required'),
  outsideMalaysiaState: yup.string().when('state', {
    is: (state:optionsData) => state && state.value === 'Outside Malaysia',
    then: yup.string().required('Foreign country state is required'),
  }),
  country: yup.string().required('Country is required'),
  paymentOptions: yup.string().required('Payment option is required'),
});

export default { shippingInfoSchema };
