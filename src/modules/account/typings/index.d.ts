declare namespace account{
  interface rawSubmitEditAccDetailPayload extends submitEditAccDetailPayload{
    gender:optionsData
  }

  interface submitEditAccDetailPayload{
    fullName:string
    gender:string
    email:string
    phoneNumber:string
    dob:string
  }

  interface rawSubmitAddEditAddressPayload extends submitAddEditAddressPayload{
    state: optionsData
  }

  interface submitAddEditAddressPayload{
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
}
