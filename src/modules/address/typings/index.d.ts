declare namespace address {
  interface addressData extends addAddressPayload {
    id: number;
    state: { id: number; name: string };
  }

  interface addAddressPayload {
    receiverName: string;
    receiverCountryCode: string;
    receiverPhoneNumber: string;
    addressLineOne: string;
    addressLineTwo?: string;
    postcode: string;
    city: string;
    state: numberOptionsData;
    country: string;
    isDefault: boolean;
    tag?: string;
  }

  interface addEditAddressModalData extends deleteAddressModalData {
    actionType: "Add" | "Edit" | "";
  }

  interface deleteAddressModalData {
    isModalOpen: boolean;
    selectedAddress?: addressData;
  }

  interface deleteAddressPayload {
    addressId: number;
  }

  interface updateAddressPayload extends addAddressPayload {
    addressId: number;
  }
}
