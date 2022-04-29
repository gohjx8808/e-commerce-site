import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { isSSR } from "@utils/constants";
import { accountLocalStorageKeys } from "@utils/localStorageKeys";
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
} from "./authApis";

export const getCurrentUserDetailsKey = "getCurrentUserDetails";

export const useLogin = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("login", signIn, {
    onSuccess: (response) => {
      localStorage.setItem(
        accountLocalStorageKeys.uid,
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
      localStorage.removeItem(accountLocalStorageKeys.uid);
    },
  });

export const useUserDetails = (onAdditionalSuccess?: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { mutate: logout } = useLogout();

  return useQuery(
    getCurrentUserDetailsKey,
    async () => {
      const uid = localStorage.getItem(accountLocalStorageKeys.uid) || "";
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
      enabled: !isSSR && !!localStorage.getItem(accountLocalStorageKeys.uid),
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

const useSaveUserDetails = () =>
  useMutation("saveUserDetails", saveUserDetails);

export const useSignUp = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  const { mutate: saveUserData } = useSaveUserDetails();

  return useMutation("submitSignUp", registerUser, {
    onSuccess: (response, variables) => {
      const userID = response.user?.uid!;
      const userDetails = {
        uid: userID,
        userData: {
          email: variables.email,
          dob: variables.dob,
          gender: variables.gender.value,
          fullName: variables.fullName,
          phoneNumber: variables.phoneNumber,
          roles: {
            admin: false,
            customer: true,
          },
        },
      };
      saveUserData(userDetails);
      toggleSuccess(true);
      updateMsg(
        "Your registration is successful! Please login using your credentials."
      );
      toggleVisible(true);
      navigate(routeNames.login);
    },
    onError: (error: firebase.auth.Error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        updateMsg(
          "The provided email is already in use by an existing user. " +
            "Please register using another email or login using the correct credentials."
        );
      } else if (errorCode === "auth/invalid-email") {
        updateMsg("Invalid email! Please try again.");
      } else {
        updateMsg("Your registration has failed! Please try again.");
      }
      toggleSuccess(false);
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Registration"),
  });
};
