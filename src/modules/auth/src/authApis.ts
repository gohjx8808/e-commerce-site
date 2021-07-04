import firebase from 'gatsby-plugin-firebase';
import 'firebase/auth';
import 'firebase/database';

export const registerUser = (payload:auth.registerUserPayload) => (
  firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
);

export const saveUserDetails = (uid:string, userDetails:auth.saveUserDetailsPayload) => {
  firebase.database().ref(`users/${uid}`).set(userDetails);
};
