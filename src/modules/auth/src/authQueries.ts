import { navigate } from "gatsby";
import { useMutation, useQuery } from "react-query";
import { useAppDispatch } from "../../../hooks";
import { currentUserDetailStorageKey } from "./authConstants";
import { getCurrentUserDetails, signOut } from "./authApis";
import { toggleLoadingOverlay } from "../../overlay/src/overlayReducer";
import {
  updateStatusTitle,
  updateStatusMsg,
  toggleSuccess,
  toggleStatusModal,
} from "../../status/src/statusReducer";

// eslint-disable-next-line import/prefer-default-export
export const useLogout = () =>
  useMutation("signOut", signOut, {
    onSuccess: () => localStorage.clear(),
  });

export const useUserDetails = () => {
  const dispatch = useAppDispatch();
  const { mutate: logout } = useLogout();

  return useQuery(
    "getCurrentUserDetails",
    async () => {
      const uid = localStorage.getItem("uid") || "";
      const response = await getCurrentUserDetails(uid);

      return response.val();
    },
    {
      onSuccess: (response) => {
        try {
          const userDetails: auth.userDetails = response;
          if (userDetails.roles.customer) {
            localStorage.setItem(
              currentUserDetailStorageKey,
              JSON.stringify(userDetails)
            );
            dispatch(toggleLoadingOverlay(false));
            navigate("/");
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
      enabled: false,
    }
  );
};
