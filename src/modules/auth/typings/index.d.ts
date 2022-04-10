declare namespace auth {
  interface submitSignInPayload {
    email: string;
    password: string;
  }

  interface submitSignupPayload {
    email: string;
    dob: string;
    confirmPassword: string;
    gender: optionsData;
    password: string;
    phoneNumber: string;
    fullName: string;
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
    usedPromocode: string[];
    roles: roleData;
  }

  interface roleData {
    admin: boolean;
    customer: boolean;
  }

  interface addressData {
    fullName: string;
    phoneNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    city: string;
    state: string;
    outsideMalaysiaState: string;
    country: string;
    defaultOption: "0" | "1";
    tag: string;
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
    usedPromocode: string[];
    roles: roleData;
  }
}
