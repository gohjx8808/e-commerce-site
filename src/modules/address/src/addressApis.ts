import { getRequest, postRequest } from "@utils/apiUtils";

// eslint-disable-next-line import/prefer-default-export
export const getAddressList = () =>
  getRequest<Response<address.addressData[]>>("/addresses/list", {}, true);

export const deleteAddress = (payload: address.deleteAddressPayload) =>
  postRequest("addresses/delete", payload, true);

export const addAddress = (payload: address.addAddressPayload) =>
  postRequest("addresses/add", payload, true);

export const updateAddress = (payload: address.updateAddressPayload) =>
  postRequest("addresses/update", payload, true);
