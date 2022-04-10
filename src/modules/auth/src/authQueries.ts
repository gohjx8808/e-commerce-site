import { navigate } from "gatsby";
import firebase from "gatsby-plugin-firebase";
import { useMutation, useQuery } from "react-query";
import { useAppDispatch } from "../../../hooks";
import routeNames from "../../../utils/routeNames";
import { toggleLoadingOverlay } from "../../overlay/src/overlayReducer";
import {
  toggleStatusModal,
  toggleSuccess,
  updateStatusMsg,
  updateStatusTitle,
} from "../../status/src/statusReducer";
import {
  getCurrentUserDetails,
  registerUser,
  resetPassword,
  saveUserDetails,
  signOut,
} from "./authApis";
import { uidStorageKey } from "./authConstants";

export const getCurrentUserDetailsKey = "getCurrentUserDetails";

export const useLogout = (toggleModal?: () => void) =>
  useMutation("signOut", signOut, {
    onSuccess: () => {
      if (toggleModal) {
        toggleModal();
      }
      window.location.reload();
      localStorage.removeItem(uidStorageKey);
    },
  });

export const useUserDetails = (onAdditionalSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const { mutate: logout } = useLogout();

  return useQuery(
    getCurrentUserDetailsKey,
    async () => {
      const uid = localStorage.getItem(uidStorageKey) || "";
      const response = await getCurrentUserDetails(uid);

      const parsedResponse: auth.currentUserDetails = response.val();
      return parsedResponse;
    },
    {
      onSuccess: (response) => {
        try {
          const userDetails: auth.userDetails = response;
          if (userDetails.roles.customer) {
            dispatch(toggleLoadingOverlay(false));
            if (onAdditionalSuccess) {
              onAdditionalSuccess();
            }
          } else {
            logout();
            throw new Error("No permission");
          }
        } catch (error) {
          dispatch(updateStatusTitle("Log In"));
          dispatch(updateStatusMsg("Invalid credentials! Please try again."));
          dispatch(toggleSuccess(false));
          dispatch(toggleLoadingOverlay(false));
          dispatch(toggleStatusModal(true));
        }
      },
      enabled: !!localStorage.getItem(uidStorageKey),
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
};

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();

  return useMutation("submitForgotPassword", resetPassword, {
    onSuccess: () => {
      dispatch(toggleSuccess(true));
      dispatch(
        updateStatusMsg(
          "An email to reset your password has been sent to your registered email address."
        )
      );
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleStatusModal(true));
      navigate(routeNames.login);
    },
    onError: (error: firebase.auth.Error) => {
      if (error.code === "auth/user-not-found") {
        dispatch(
          updateStatusMsg(
            "The email address is not registered. Please insert a registered email address!"
          )
        );
      } else {
        dispatch(updateStatusMsg("Network error! Please try again."));
      }
      dispatch(toggleSuccess(false));
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleStatusModal(true));
    },
  });
};

const useSaveUserDetails = () =>
  useMutation("saveUserDetails", saveUserDetails);

export const useSignUp = () => {
  const dispatch = useAppDispatch();

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
      dispatch(toggleSuccess(true));
      dispatch(
        updateStatusMsg(
          "Your registration is successful! Please login using your credentials."
        )
      );
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleStatusModal(true));
      navigate(routeNames.login);
    },
    onError: (error: firebase.auth.Error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        dispatch(
          updateStatusMsg(
            "The provided email is already in use by an existing user. " +
              "Please register using another email or login using the correct credentials."
          )
        );
      } else if (errorCode === "auth/invalid-email") {
        dispatch(updateStatusMsg("Invalid email! Please try again."));
      } else {
        dispatch(
          updateStatusMsg("Your registration has failed! Please try again.")
        );
      }
      dispatch(toggleSuccess(false));
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleStatusModal(true));
    },
  });
};
