import { postRequest } from "@utils/apiUtils";
import "firebase/auth";
import "firebase/database";
import firebase from "gatsby-plugin-firebase";

export const registerUser = (payload: auth.submitSignUpPayload) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password);

export const saveUserDetails = (userDetails: auth.saveUserDetailsPayload) =>
  firebase.database().ref(`users/${userDetails.uid}`).set(userDetails.userData);

export const getCurrentUserDetails = (uid: string) =>
  firebase.database().ref(`users/${uid}`).once("value");

export const signOut = () => firebase.auth().signOut();

export const resetPassword = (payload: auth.submitForgotPasswordPayload) =>
  firebase.auth().sendPasswordResetEmail(payload.email);

export const signUp = (payload: auth.submitSignUpPayload) =>
  postRequest("sign-up", payload);

export const signIn = (payload: auth.signInPayload) =>
  postRequest<auth.signInResponse>("sign-in", payload);
