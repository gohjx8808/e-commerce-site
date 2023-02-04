declare namespace account {
  interface rawSubmitAddEditAddressPayload extends auth.addressData {
    state: optionsData;
  }

  interface submitAddEditAddressPayload {
    uid: string;
    addressData: auth.addressData[];
  }

  interface addEditAddressModalData extends deleteAddressModalData {
    actionType: "Add" | "Edit" | "";
  }

  interface deleteAddressModalData {
    isModalOpen: boolean;
    selectedAddress: auth.addressData | null;
  }

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
    preferredName:string
    dob: string;
    gender: string;
    countryCode: string;
    phoneNo: string;
  }
}
