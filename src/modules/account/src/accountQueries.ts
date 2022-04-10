import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../hooks";
import { uidStorageKey } from "../../auth/src/authConstants";
import {
  getCurrentUserDetailsKey,
  useUserDetails,
} from "../../auth/src/authQueries";
import {
  toggleStatusModal,
  toggleSuccess,
  updateStatusMsg,
  updateStatusTitle,
} from "../../status/src/statusReducer";
import { submitEditAccDetail, updateAddress } from "./accountApi";
import { addressStatus } from "./accountConstants";
import { removeDefaultAddress, sameAddressDetector } from "./accountUtils";

export const useEditAccDetails = (toggleModal?: () => void) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation("submitEditAccDetails", submitEditAccDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      if (toggleModal) {
        toggleModal();
      }
      dispatch(updateStatusTitle("Edit Account Details"));
      dispatch(toggleSuccess(true));
      dispatch(updateStatusMsg("Your profile has been successfully updated!"));
      dispatch(toggleStatusModal(true));
    },
    onError: () => {
      dispatch(updateStatusTitle("Edit Account Details"));
      dispatch(toggleSuccess(false));
      dispatch(updateStatusMsg("Your profile has failed to be update!"));
      dispatch(toggleStatusModal(true));
    },
  });
};

export const useAddEditAddress = (
  modalData: account.addEditAddressModalData,
  toggleModal?: () => void,
  showStatusModal: boolean = true
) => {
  const dispatch = useAppDispatch();
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
        uid: localStorage.getItem(uidStorageKey)!,
        addressData: currentAddresses,
      };
      return updateAddress(finalPostData);
    }
    throw new Error("duplicate addres");
  };

  return useMutation("addEditAddress", onSubmitForm, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      if (showStatusModal) {
        dispatch(updateStatusTitle(addressStatus[modalData.actionType].title));
        dispatch(toggleSuccess(true));
        dispatch(
          updateStatusMsg(addressStatus[modalData.actionType].successMsg)
        );
        if (toggleModal) {
          toggleModal();
        }
        dispatch(toggleStatusModal(true));
      }
    },
    onError: () => {
      if (showStatusModal) {
        dispatch(updateStatusTitle(addressStatus[modalData.actionType].title));
        dispatch(toggleSuccess(false));
        dispatch(
          updateStatusMsg(
            "Duplicated address detected. Please use a different address."
          )
        );
        if (toggleModal) {
          toggleModal();
        }
        dispatch(toggleStatusModal(true));
      }
    },
  });
};

export const useDeleteAddress = (toggleModal: () => void) => {
  const dispatch = useAppDispatch();
  const { data: currentUserDetails } = useUserDetails();
  const queryClient=useQueryClient();

  const deleteAddress = (selectedAddress: auth.addressData) => {
    const currentAddresses = currentUserDetails?.addressBook || [];
    const removeIndex = currentAddresses.findIndex(
      (address) => address === selectedAddress
    );
    currentAddresses.splice(removeIndex, 1);
    const postData = {
      uid: localStorage.getItem(uidStorageKey)!,
      addressData: currentAddresses,
    };
    return updateAddress(postData);
  };

  return useMutation("deleteAddress", deleteAddress, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      dispatch(toggleSuccess(true));
      dispatch(updateStatusTitle("Delete Address"));
      dispatch(updateStatusMsg("Your address has been successfully deleted!"));
      toggleModal();
      dispatch(toggleStatusModal(true));
    },
    onError: () => {
      dispatch(toggleSuccess(false));
      dispatch(updateStatusTitle("Delete Address"));
      dispatch(updateStatusMsg("Your address has failed to be deleted!"));
      dispatch(toggleStatusModal(true));
    },
  });
};
