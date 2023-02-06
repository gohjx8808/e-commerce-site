import routeNames from "./routeNames";

export const stateOptions = [
  { value: "Johor", label: "Johor" },
  { value: "Kedah", label: "Kedah" },
  { value: "Kelantan", label: "Kelantan" },
  { value: "Kuala Lumpur", label: "Kuala Lumpur" },
  { value: "Labuan", label: "Labuan" },
  { value: "Melaka", label: "Melaka" },
  { value: "Negeri Sembilan", label: "Negeri Sembilan" },
  { value: "Pahang", label: "Pahang" },
  { value: "Perak", label: "Perak" },
  { value: "Perlis", label: "Perlis" },
  { value: "Pulau Pinang", label: "Pulau Pinang" },
  { value: "Putrajaya", label: "Putrajaya" },
  { value: "Sabah", label: "Sabah" },
  { value: "Sarawak", label: "Sarawak" },
  { value: "Selangor", label: "Selangor" },
  { value: "Terengganu", label: "Terengganu" },
  { value: "Outside Malaysia", label: "Outside Malaysia" },
];

export const booleanOptions = [
  { value: false, label: "No" },
  { value: true, label: "Yes" },
];

export const homeColor = "orange";
export const workColor = "lightblue";

export const itemVariationOptions = [
  { label: "With Keychain", value: "With Keychain" },
  { label: "Without Keychain", value: "Without Keychain" },
];

export const drawerWidth = 210;

export const emptyShippingInfo: products.submitShippingInfoPayload = {
  fullName: "",
  email: "",
  phoneNumber: "60",
  addressLine1: "",
  addressLine2: "",
  postcode: "",
  city: "",
  state: "",
  outsideMalaysiaState: "",
  country: "",
  promoCode: "",
  note: "",
  saveShippingInfo: false,
  paymentOptions: "",
};

export const routeMap: { [key: string]: string } = {
  [routeNames.login]: "Login",
  [routeNames.signUp]: "Sign Up",
  [routeNames.cart]: "Shopping Cart",
  "/": "Home",
  [routeNames.checkout]: "Checkout",
  [routeNames.account]: "My Account",
  [routeNames.products]: "Products",
  [routeNames.feedbackForm]: "Feedback",
  [routeNames.learnMore]: "Learn More",
  [routeNames.imageGallery]: "Image Gallery",
  [routeNames.productDescription]: "Product Description",
  [routeNames.forgotPassword]: "Forgot Password",
};

export enum socialMediaLinks {
  FACEBOOK = "https://www.facebook.com/YJartjournal/",
  INSTAGRAM = "https://www.instagram.com/yjartjournal/",
  XHS = "https://www.xiaohongshu.com/user/profile/5cf791af000000000500c3eb?xhsshare=CopyLink&appuid=5cf791af000000000500c3eb&apptime=1642396244",
}

export const genderOptions: optionsData[] = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];