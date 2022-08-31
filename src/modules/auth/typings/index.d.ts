declare namespace auth {
  interface logInPayload {
    email: string;
    password: string;
  }

  interface logInResponse {
    data: {
      token: string;
    };
  }

  interface submitSignUpPayload {
    email: string;
    dob: Date;
    gender: string;
    password: string;
    countryCodeId: number;
    phoneNo: string;
    name: string;
  }

  interface signUpFormData {
    email: string;
    dob: Date;
    confirmPassword: string;
    gender: optionsData;
    password: string;
    countryCode: account.countryCodeData;
    phoneNumber: string;
    fullName: string;
  }

  interface signUpErrorData {
    email: string[];
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
    defaultOption: "0" | "1" | "";
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
    usedPromoCodes: string[];
    roles: roleData;
  }
}
