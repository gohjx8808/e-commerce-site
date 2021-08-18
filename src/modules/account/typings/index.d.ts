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

  interface submitAddEditAddressPayload{
    fullName:string
    phoneNumber:string
    email:string
    addressLine1: string
    addressLine2:string
    postcode: string
    city: string
    state: optionsData
    outsideMalaysiaState: string
    country: string
    defaultOption:string
    tag:string
  }

  interface finalSubmitAddEditAddressPayload{
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
