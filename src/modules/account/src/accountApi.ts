import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

export const submitEditAccDetail = (payload:account.submitEditAccDetailPayload) => firebase.database().ref(`/users/${payload.uid}`).update(payload.details);

export const updateAddress = (payload:account.submitAddEditAddressPayload[], uid:string) => firebase.database().ref(`/users/${uid}/addressBook`).set(payload);
