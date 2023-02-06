import { getRequest, postRequest } from "@utils/apiUtils";

export const getAccountDetails = () =>
  getRequest<Response<account.accDetailsData>>("account/details", {}, true);

export const updateAccDetails = (
  payload: account.updateAccDetailsPayload
) => postRequest("account/update", payload, true);
