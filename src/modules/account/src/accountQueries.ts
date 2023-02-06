import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { getAccountDetails, updateAccDetails } from "./accountApis";

export const useAccountDetails = () =>
  useQuery(
    "getAccountDetails",
    async () => (await getAccountDetails()).data.data,
    {
      enabled: !!localStorage.getItem(authLocalStorageKeys.TOKEN),
    }
  );

export const useUpdateAccDetails = (
  toggleModal: () => void,
  refetch: () => void
) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("postUpdateAccDetails", updateAccDetails, {
    onSuccess: () => {
      refetch();
      toggleSuccess(true);
      updateMsg("Your profile had been updated successfully!");
      toggleModal();
      toggleVisible(true);
    },
    onError: () => {
      toggleSuccess(false);
      updateMsg("Your profile had failed to update. Please try again later.");
      toggleVisible(true);
    },
    onSettled: () => {
      updateTitle("Update Profile");
    },
  });
};
