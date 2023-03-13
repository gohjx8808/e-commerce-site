import { postRequest } from "@utils/apiUtils";
import "firebase/auth";
import "firebase/database";
import firebase from "gatsby-plugin-firebase";

export const resetPassword = (payload: auth.submitForgotPasswordPayload) =>
  firebase.auth().sendPasswordResetEmail(payload.email);

export const signUp = (payload: auth.submitSignUpPayload) =>
  postRequest("users/sign-up", payload);

export const logIn = (payload: auth.logInPayload) =>
  postRequest<Response<auth.logInResponse>>("users/sign-in", payload);
