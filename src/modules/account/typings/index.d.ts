declare namespace account {
  interface accDetailsData {
    id: number;
    name: string;
    preferredName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    gender: "M" | "F";
    dob: string;
  }

  interface updateAccDetailsFormData extends updateAccDetailsPayload {
    gender: optionsData;
  }
  
  interface updateAccDetailsPayload {
    name: string;
    preferredName: string;
    dob: string;
    gender: string;
    countryCode: string;
    phoneNo: string;
  }
}
