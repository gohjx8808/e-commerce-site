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

  interface submitForgotPasswordPayload {
    email: string;
  }
}
