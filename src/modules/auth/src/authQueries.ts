import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useUID } from "@hooks";
import { accountLocalStorageKeys } from "@utils/localStorageKeys";
import { AxiosError } from "axios";
import { navigate } from "gatsby";
import firebase from "gatsby-plugin-firebase";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import routeNames from "../../../utils/routeNames";
import {
  getCurrentUserDetails,
  registerUser,
  resetPassword,
  saveUserDetails,
  signIn,
  signOut,
  signUp,
} from "./authApis";

export const getCurrentUserDetailsKey = "getCurrentUserDetails";

export const useLogin = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("login", signIn, {
    onSuccess: (response) => {
      localStorage.setItem(
        accountLocalStorageKeys.UID,
        response.user?.uid || ""
      );
      navigate("/");
    },
    onError: () => {
      updateTitle("Login");
      updateMsg(
        "Your credentials are invalid! Please login with a valid username and password."
      );
      toggleSuccess(false);
      toggleVisible(true);
    },
  });
};

export const useLogout = (toggleModal?: () => void) =>
  useMutation("signOut", signOut, {
    onSuccess: () => {
      if (toggleModal) {
        toggleModal();
      }
      window.location.reload();
      localStorage.removeItem(accountLocalStorageKeys.UID);
    },
  });

export const useUserDetails = (onAdditionalSuccess?: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { mutate: logout } = useLogout();

  const isLoggedIn = useUID();

  return useQuery(
    getCurrentUserDetailsKey,
    async () => {
      const uid = localStorage.getItem(accountLocalStorageKeys.UID) || "";
      const response = await getCurrentUserDetails(uid);

      const parsedResponse: auth.currentUserDetails = response.val();
      return parsedResponse;
    },
    {
      onSuccess: (response) => {
        try {
          const userDetails: auth.userDetails = response;
          if (userDetails.roles.customer) {
            if (onAdditionalSuccess) {
              onAdditionalSuccess();
            }
          } else {
            logout();
            throw new Error("No permission");
          }
        } catch (error) {
          updateTitle("Log In");
          updateMsg("Invalid credentials! Please try again.");
          toggleSuccess(false);
          toggleVisible(true);
        }
      },
      onError: () => localStorage.removeItem(accountLocalStorageKeys.UID),
      enabled: !!isLoggedIn,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
};

export const useForgotPassword = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("submitForgotPassword", resetPassword, {
    onSuccess: () => {
      toggleSuccess(true);
      updateMsg(
        "An email to reset your password has been sent to your registered email address."
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: firebase.auth.Error) => {
      if (error.code === "auth/user-not-found") {
        updateMsg(
          "The email address is not registered. Please insert a registered email address!"
        );
      } else {
        updateMsg("Network error! Please try again.");
      }
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
        "Your registration is successful! Please login using your credentials."
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: AxiosError<auth.signUpErrorData>) => {
      const errResponse = error.response?.data;
      let errorMsg = "";
      if (errResponse?.email) {
        errorMsg =
          "The provided email is already in use by an existing user. " +
          "Please register using another email or login using the correct credentials.";
      } else {
        errorMsg = "Your registration has failed! Please try again.";
      }
      updateMsg(errorMsg);
      toggleSuccess(false);
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Registration"),
  });
};
