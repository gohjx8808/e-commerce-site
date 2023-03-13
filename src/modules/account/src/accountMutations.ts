/* eslint-disable import/prefer-default-export */
import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useContext } from "react";
import { useMutation } from "react-query";
import { updateAccDetails } from "./accountApis";

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
