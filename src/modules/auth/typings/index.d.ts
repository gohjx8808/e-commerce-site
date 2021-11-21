declare namespace auth{
  interface submitSignInPayload{
    email:string
    password:string
  }

  interface submitSignupPayload{
    email:string
    dob:string
    confirmPassword:string
    gender:optionsData
    password:string
    phoneNumber:string
    fullName:string
  }

  interface registerUserPayload{
    email:string
    password:string
  }

  interface saveUserDetailsPayload{
    email:string
    dob:string
    gender:string
    fullName:string
    phoneNumber:string
    roles:string[]
  }

  interface currentUserDetails{
    uid:string
    dob:string
    email:string
    fullName:string
    gender:string
    phoneNumber:string
    addressBook:addressData[]
    usedPromocode:string[]
    roles:string[]
  }

  interface addressData{
    fullName:string
    phoneNumber:string
    email:string
    addressLine1: string
    addressLine2:string
    postcode: string
    city: string
    state: string
    outsideMalaysiaState: string
    country: string
    defaultOption:string
    tag:string
  }

  interface submitForgotPasswordPayload{
    email:string
  }
}
