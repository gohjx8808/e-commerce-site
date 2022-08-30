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

  interface accountOptionsData {
    countryCodes: countryCodeData[];
    genders: optionsData[];
  }

  interface countryCodeData {
    id: number;
    countryCode: string;
    iso2: string;
    name: string;
  }

  interface accDetailsData {
    id: number;
    name: string;
    dob: string;
    email: string;
    gender: string;
    phoneNo: string;
  }

  interface editAccDetailsData extends accDetailsData {
    countryCodeId: number;
  }

  interface updateAccDetailsFormData extends updateAccDetailsPayload{
    gender: optionsData;
    countryCode: countryCodeData;
  }

  interface updateAccDetailsPayload {
    name: string;
    dob: string;
    email: string;
    gender: string;
    countryCodeId: number;
    phoneNo: string;
  }
}
