import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useContext } from "react";
import { useMutation } from "react-query";
import { deleteAddress } from "./addressApis";
import { useAddressList } from "./addressQueries";

/* eslint-disable import/prefer-default-export */
export const useDeleteAddress = (toggleModal: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { refetch } = useAddressList();

  return useMutation("deleteAddress", deleteAddress, {
    onSuccess: () => {
      refetch();
      toggleSuccess(true);
      updateMsg("Your address has been successfully deleted!");
      toggleModal();
      toggleVisible(true);
    },
    onError: () => {
      toggleSuccess(false);
      updateMsg("Your address has failed to be deleted!");
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Delete Address"),
  });
};
