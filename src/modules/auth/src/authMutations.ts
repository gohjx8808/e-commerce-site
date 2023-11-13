import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { AxiosError } from "axios";
import { navigate } from "gatsby";
import { useContext } from "react";
import { useMutation } from "react-query";
import routeNames from "../../../utils/routeNames";
import {
  logIn,
  postForgotPassword,
  postResetPassword,
  signUp,
} from "./authApis";

export const useForgotPassword = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("submitForgotPassword", postForgotPassword, {
    onSuccess: () => {
      toggleSuccess(true);
      updateMsg(
        "An email to reset your password has been sent to your registered email address.",
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: AxiosError<customErrorData>) => {
      updateMsg(
        error.response?.data.message || "Network error! Please try again.",
      );
      toggleSuccess(false);
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Reset Password"),
  });
};

export const useResetPassword = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("submitResetPassword", postResetPassword, {
    onSuccess: () => {
      toggleSuccess(true);
      updateMsg(
        "Your password had been reset. Please login using your new password.",
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: AxiosError<customErrorData>) => {
      updateMsg(
        error.response?.data.message || "Network error! Please try again.",
      );
      toggleSuccess(false);
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Reset Password"),
  });
};

export const useSignUp = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("submitSignUp", signUp, {
    onSuccess: () => {
      toggleSuccess(true);
      updateMsg(
        "Your registration is successful! Please login using your credentials.",
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: AxiosError<customErrorData>) => {
      const errResponse = error.response?.data;
      let errorMsg = errResponse?.message || "";
      if (!errResponse?.message) {
        errorMsg = "Your registration has failed! Please try again.";
      } else if (errResponse.message === "Same email exists.") {
        errorMsg =
          "The provided email is already in use by an existing user. " +
          "Please register using another email or login using the correct credentials.";
      }
      updateMsg(errorMsg);
      toggleSuccess(false);
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Registration"),
  });
};

export const useLogIn = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("logIn", logIn, {
    onSuccess: (response) => {
      localStorage.setItem(
        authLocalStorageKeys.TOKEN,
        response.data.data.accessToken,
      );
      localStorage.setItem(
        authLocalStorageKeys.USER,
        JSON.stringify(response.data.data.user),
      );
      navigate(routeNames.home);
    },
    onError: (error: AxiosError<customErrorData>) => {
      updateTitle("Log In");
      const errResponse = error.response?.data;
      let errorMsg = errResponse?.message || "";
      if (!errResponse?.message) {
        errorMsg = "Network error occur. Please contact administrator.";
      }
      updateMsg(errorMsg);
      toggleSuccess(false);
      toggleVisible(true);
    },
  });
};
