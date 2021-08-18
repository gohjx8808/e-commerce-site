import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

export const submitEditAccDetail = (payload:account.submitEditAccDetailPayload, uid:string) => firebase.database().ref(`/users/${uid}`).set(payload);

export const submitAddNewAddress = (payload:account.finalSubmitAddEditAddressPayload[], uid:string) => firebase.database().ref(`/users/${uid}/addressBook`).set(payload);
