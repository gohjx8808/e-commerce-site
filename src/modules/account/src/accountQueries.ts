import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { accountLocalStorageKeys } from "@utils/localStorageKeys";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  getCurrentUserDetailsKey,
  useUserDetails,
} from "../../auth/src/authQueries";
import { submitEditAccDetail, updateAddress } from "./accountApi";
import { addressStatus } from "./accountConstants";
import { removeDefaultAddress, sameAddressDetector } from "./accountUtils";

export const useEditAccDetails = (toggleModal?: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const queryClient = useQueryClient();

  return useMutation("submitEditAccDetails", submitEditAccDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      if (toggleModal) {
        toggleModal();
      }
      toggleSuccess(true);
      updateMsg("Your profile has been successfully updated!");
      toggleVisible(true);
    },
    onError: () => {
      toggleSuccess(false);
      updateMsg("Your profile has failed to be update!");
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Edit Account Details"),
  });
};

export const useAddEditAddress = (
  modalData: account.addEditAddressModalData,
  toggleModal?: () => void,
  showStatusModal: boolean = true
) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const queryClient = useQueryClient();
  const { data: currentUserDetails } = useUserDetails();

  const onSubmitForm = (formData: auth.addressData) => {
    let currentAddresses = currentUserDetails?.addressBook || [];
    let isAddressExist = false;
    if (currentAddresses.length > 0) {
      isAddressExist = sameAddressDetector(currentAddresses, formData);
    }
    if (!isAddressExist) {
      if (modalData.actionType === "Add") {
        if (currentAddresses.length > 0) {
          if (formData.defaultOption === "1") {
            currentAddresses = removeDefaultAddress(currentAddresses);
          }
        }
        currentAddresses.push(formData);
      } else {
        const editIndex = currentAddresses.findIndex(
          (address) => address === modalData.selectedAddress
        );
        if (formData.defaultOption === "1") {
          currentAddresses = removeDefaultAddress(currentAddresses);
        }
        currentAddresses[editIndex] = formData;
      }
      const finalPostData = {
        uid: localStorage.getItem(accountLocalStorageKeys.UID)!,
        addressData: currentAddresses,
      };
      return updateAddress(finalPostData);
    }
    throw new Error("duplicate address");
  };

  return useMutation("addEditAddress", onSubmitForm, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      if (showStatusModal) {
        toggleSuccess(true);
        updateMsg(addressStatus[modalData.actionType].successMsg);
        if (toggleModal) {
          toggleModal();
        }
        toggleVisible(true);
      }
    },
    onError: () => {
      if (showStatusModal) {
        toggleSuccess(false);
        updateMsg(
          "Duplicated address detected. Please use a different address."
        );
        if (toggleModal) {
          toggleModal();
        }
        toggleVisible(true);
      }
    },
    onSettled: () => updateTitle(addressStatus[modalData.actionType].title),
  });
};

export const useDeleteAddress = (toggleModal: () => void) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  const { data: currentUserDetails } = useUserDetails();
  const queryClient = useQueryClient();

  const deleteAddress = (selectedAddress: auth.addressData) => {
    const currentAddresses = currentUserDetails?.addressBook || [];
    const removeIndex = currentAddresses.findIndex(
      (address) => address === selectedAddress
    );
    currentAddresses.splice(removeIndex, 1);
    const postData = {
      uid: localStorage.getItem(accountLocalStorageKeys.UID)!,
      addressData: currentAddresses,
    };
    return updateAddress(postData);
  };

  return useMutation("deleteAddress", deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
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
