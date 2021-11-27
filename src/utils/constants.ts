import routeNames from './routeNames';

export const stateOptions = [
  { value: 'Johor', label: 'Johor' },
  { value: 'Kedah', label: 'Kedah' },
  { value: 'Kelantan', label: 'Kelantan' },
  { value: 'Kuala Lumpur', label: 'Kuala Lumpur' },
  { value: 'Labuan', label: 'Labuan' },
  { value: 'Melaka', label: 'Melaka' },
  { value: 'Negeri Sembilan', label: 'Negeri Sembilan' },
  { value: 'Pahang', label: 'Pahang' },
  { value: 'Perak', label: 'Perak' },
  { value: 'Perlis', label: 'Perlis' },
  { value: 'Pulau Pinang', label: 'Pulau Pinang' },
  { value: 'Putrajaya', label: 'Putrajaya' },
  { value: 'Sabah', label: 'Sabah' },
  { value: 'Sarawak', label: 'Sarawak' },
  { value: 'Selangor', label: 'Selangor' },
  { value: 'Terengganu', label: 'Terengganu' },
  { value: 'Outside Malaysia', label: 'Outside Malaysia' },
];

export const booleanOptions = [
  { value: '0', label: 'No' },
  { value: '1', label: 'Yes' },
];

export const homeColor = 'orange';
export const workColor = 'lightblue';

export const defaultAddressData = {
  fullName: '',
  phoneNumber: '60',
  addressLine1: '',
  addressLine2: '',
  postcode: '',
  city: '',
  state: '',
  outsideMalaysiaState: '',
  country: '',
  defaultOption: '',
  tag: '',
  email: '',
};

export const itemVariationOptions = [
  { label: 'With Keychain', value: 'With Keychain' },
  { label: 'Without Keychain', value: 'Without Keychain' },
];

export const drawerWidth = 210;

export const emptyShippingInfo:products.submitShippingInfoPayload = {
  fullName: '',
  email: '',
  phoneNumber: '60',
  addressLine1: '',
  addressLine2: '',
  postcode: '',
  city: '',
  state: '',
  outsideMalaysiaState: '',
  country: '',
  promoCode: '',
  note: '',
  saveShippingInfo: false,
  paymentOptions: '',
};

export const isSSR = typeof window === 'undefined';

export const defaultProductData:products.productData = {
  category: '',
  contentful_id: '',
  name: '',
  price: 0,
  productImage: [],
  discountedPrice: 0,
};

export const routeMap: { [key: string]: string } = {
  [routeNames.login]: 'Login',
  [routeNames.signUp]: 'Sign Up',
  [routeNames.cart]: 'Shopping Cart',
  '/': 'Home',
  [routeNames.checkout]: 'Checkout',
  [routeNames.account]: 'My Account',
  [routeNames.products]: 'Products',
  [routeNames.feedbackForm]: 'Feedback',
  [routeNames.learnMore]: 'Learn More',
  [routeNames.imageGallery]: 'Image Gallery',
  [routeNames.productDescription]: 'Product Description',
  [routeNames.forgotPassword]: 'Forgot Password',
};
