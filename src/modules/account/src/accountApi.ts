import firebase from "gatsby-plugin-firebase";
import "firebase/database";
import { getRequest } from "@utils/apiUtils";

export const submitEditAccDetail = (
  payload: account.submitEditAccDetailPayload
) => firebase.database().ref(`/users/${payload.uid}`).update(payload.details);

export const updateAddress = (payload: account.submitAddEditAddressPayload) =>
  firebase
    .database()
    .ref(`/users/${payload.uid}/addressBook`)
    .set(payload.addressData);

export const getAccountOptions = () =>
  getRequest<account.accountOptionsData>("account-options");

export const getAccountDetails = () =>
  getRequest<account.accDetailsData>("account/details", {}, true);
