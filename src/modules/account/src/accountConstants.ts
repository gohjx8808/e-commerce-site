export const addressStatus: customObject = {
  Edit: {
    title: "Edit Address",
    successMsg: "Your address has been successfully updated!",
    failMsg: "Your address has failed to update!",
  },
  Add: {
    title: "Add Address",
    successMsg: "Your address has been successfully added!",
    failMsg: "Your address has failed to add!",
  },
};

export const defaultAddressData:account.rawSubmitAddEditAddressPayload = {
  fullName: "",
  phoneNumber: "60",
  addressLine1: "",
  addressLine2: "",
  postcode: "",
  city: "",
  state: null as unknown as optionsData,
  outsideMalaysiaState: "",
  country: "",
  defaultOption: "",
  tag: "",
  email: "",
};
