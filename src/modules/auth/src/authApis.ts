import { postRequest } from "@utils/apiUtils";

export const signUp = (payload: auth.submitSignUpPayload) =>
  postRequest("users/sign-up", payload);

export const logIn = (payload: auth.logInPayload) =>
  postRequest<Response<auth.logInResponse>>("users/sign-in", payload);

export const postForgotPassword = (payload: auth.submitForgotPasswordPayload) =>
  postRequest("forgot-password", payload);
