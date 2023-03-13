import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { addAddress, deleteAddress, updateAddress } from "./addressApis";
import { useAddressList } from "./addressQueries";

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

export const useAddAddress = (closeModal: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { refetch } = useAddressList();

  return useMutation("addAddress", addAddress, {
    onSuccess: () => {
      refetch();
      toggleSuccess(true);
      updateMsg("Your address has been successfully added!");
      closeModal();
      toggleVisible(true);
    },
    onError: (err: AxiosError<customErrorData>) => {
      const errMsg = err.response?.data.message;
      toggleSuccess(false);
      updateMsg(errMsg || "Your address has failed to add!");
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Add Address"),
  });
};

export const useUpdateAddress = (closeModal: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { refetch } = useAddressList();

  return useMutation("updateAddress", updateAddress, {
    onSuccess: () => {
      refetch();
      toggleSuccess(true);
      updateMsg("Your address has been successfully updated!");
      closeModal();
      toggleVisible(true);
    },
    onError: (err: AxiosError<customErrorData>) => {
      const errMsg = err.response?.data.message;
      toggleSuccess(false);
      updateMsg(errMsg || "Your address has failed to update!");
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Update Address"),
  });
};
