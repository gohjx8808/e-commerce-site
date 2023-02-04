import firebase from "gatsby-plugin-firebase";
import "firebase/database";
import { getRequest, postRequest } from "@utils/apiUtils";

export const updateAddress = (payload: account.submitAddEditAddressPayload) =>
  firebase
    .database()
    .ref(`/users/${payload.uid}/addressBook`)
    .set(payload.addressData);

export const getAccountDetails = () =>
  getRequest<Response<account.accDetailsData>>("account/details", {}, true);

export const updateAccDetails = (
  payload: account.updateAccDetailsPayload
) => postRequest("account/update", payload, true);
