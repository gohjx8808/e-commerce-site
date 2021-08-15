import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

// eslint-disable-next-line import/prefer-default-export
export const submitEditAccDetail = (payload:account.submitEditAccDetailPayload, uid:string) => firebase.database().ref(`/users/${uid}`).update(payload);
