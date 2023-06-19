import routeNames from "./routeNames";

export const booleanOptions: booleanOptionsData[] = [
  { id: false, name: "No" },
  { id: true, name: "Yes" },
];

export const homeColor = "orange";
export const workColor = "lightblue";

export const itemVariationOptions = [
  { label: "With Keychain", value: "With Keychain" },
  { label: "Without Keychain", value: "Without Keychain" },
];

export const drawerWidth = 210;

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

export const genderOptions: stringOptionsData[] = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
];

export const paymentMethods: stringOptionsData[] = [
  { id: "TNG", name: "TNG E-Wallet" },
  { id: "Bank Transfer", name: "Bank Transfer" },
];

export const CUSTOMER_ROLE = 3;
