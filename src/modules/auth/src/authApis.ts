import firebase from "gatsby-plugin-firebase";
import "firebase/auth";
import "firebase/database";

export const registerUser = (payload: auth.submitSignupPayload) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password);

export const saveUserDetails = (userDetails: auth.saveUserDetailsPayload) =>
  firebase.database().ref(`users/${userDetails.uid}`).set(userDetails.userData);

export const signIn = (payload: auth.submitSignInPayload) =>
  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);

export const getCurrentUserDetails = (uid: string) =>
  firebase.database().ref(`users/${uid}`).once("value");

export const signOut = () => firebase.auth().signOut();

export const resetPassword = (payload: auth.submitForgotPasswordPayload) =>
  firebase.auth().sendPasswordResetEmail(payload.email);
