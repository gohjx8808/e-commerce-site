declare namespace auth {
  interface logInPayload {
    email: string;
    password: string;
  }

  interface logInResponse {
    accessToken: string;
    user: submitSignUpPayload;
  }

  interface submitSignUpPayload extends signUpFormData {
    gender: string;
  }

  interface signUpFormData {
    email: string;
    dob: string;
    confirmPassword: string;
    gender: optionsData;
    password: string;
    countryCode: number;
    phoneNumber: string;
    name: string;
    preferredName?: string;
  }

  interface authErrorData {
    message: string;
  }

  interface registerUserPayload {
    email: string;
    password: string;
  }

  interface saveUserDetailsPayload {
    userData: userData;
    uid: string;
  }

  interface userData {
    email: string;
    dob: string;
    gender: string;
    fullName: string;
    phoneNumber: string;
    roles: roleData;
  }

  interface currentUserDetails {
    dob: string;
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    addressBook: addressData[];
    usedPromoCodes: string[];
    roles: roleData;
  }

  interface roleData {
    admin: boolean;
    customer: boolean;
  }

  interface submitForgotPasswordPayload {
    email: string;
  }

  interface userDetails {
    addressBook: addressData[];
    dob: string;
    email: string;
    fullName: string;
    gender: string;
    phoneNumber: string;
    usedPromoCodes: string[];
    roles: roleData;
  }
}
