declare namespace account {
  interface rawSubmitEditAccDetailPayload extends accDetailsFormData {
    gender: optionsData;
  }

  interface submitEditAccDetailPayload {
    uid: string;
    details: accDetailsFormData;
  }

  interface accDetailsFormData {
    fullName: string;
    gender: string;
    email: string;
    phoneNumber: string;
    dob: string;
  }

  interface rawSubmitAddEditAddressPayload extends auth.addressData {
    state: optionsData;
  }

  interface submitAddEditAddressPayload {
    uid: string;
    addressData: auth.addressData[];
  }

  interface addEditAddressModalData {
    actionType: "Add" | "Edit" | "";
    isModalOpen: boolean;
    selectedAddress: auth.addressData | null;
  }
}
