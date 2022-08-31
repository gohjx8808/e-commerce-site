import { postRequest } from "@utils/apiUtils";
import "firebase/auth";
import "firebase/database";
import firebase from "gatsby-plugin-firebase";

export const getCurrentUserDetails = (uid: string) =>
  firebase.database().ref(`users/${uid}`).once("value");

export const resetPassword = (payload: auth.submitForgotPasswordPayload) =>
  firebase.auth().sendPasswordResetEmail(payload.email);

export const signUp = (payload: auth.submitSignUpPayload) =>
  postRequest("sign-up", payload);

export const logIn = (payload: auth.logInPayload) =>
  postRequest<auth.logInResponse>("log-in", payload);

export const logOut = () => postRequest("log-out", {}, true);
