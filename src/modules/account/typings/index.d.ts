declare namespace account{
  interface rawSubmitEditAccDetailPayload{
    fullName:string
    gender:optionsData
    email:string
    phoneNumber:string
    dob:string
  }
  interface submitEditAccDetailPayload{
    fullName:string
    gender:string
    email:string
    phoneNumber:string
    dob:string
  }
}
