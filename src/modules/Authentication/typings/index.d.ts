declare namespace auth{
  interface submitLoginPayload{
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
  }
}
