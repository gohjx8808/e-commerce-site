import firebase from "gatsby-plugin-firebase";
import "firebase/database";

export const submitEditAccDetail = (
  payload: account.submitEditAccDetailPayload
) => firebase.database().ref(`/users/${payload.uid}`).update(payload.details);

export const updateAddress = (payload: account.submitAddEditAddressPayload) =>
  firebase
    .database()
    .ref(`/users/${payload.uid}/addressBook`)
    .set(payload.addressData);
