import { call, fork, put, select, take } from "redux-saga/effects";
import { RootState } from "../../../store";
import { defaultAddressData } from "../../../utils/constants";
import { getCurrentUserDetailsAction } from "../../auth/src/authReducer";
import { toggleLoadingOverlay } from "../../overlay/src/overlayReducer";
import {
  toggleStatusModal,
  toggleSuccess,
  updateStatusMsg,
  updateStatusTitle,
} from "../../status/src/statusReducer";
import { updateAddress } from "./accountApi";
import {
  deleteAddressAction,
  submitAddEditAddressAction,
  toggleAddressModal,
  toggleDeleteAddressConfirmationModal,
  toggleEditAccDetailModal,
  updateSelectedAddress,
} from "./accountReducer";

const addressStatus: customObject = {
  Edit: {
    title: "Edit Address",
    successMsg: "Your address has been successfully updated!",
    failMsg: "Your address has failed to update!",
  },
  Add: {
    title: "Add Address",
    successMsg: "Your address has been successfully added!",
    failMsg: "Your address has failed to add!",
  },
};

export default function* accountRuntime() {
  yield fork(submitAddEditAddressSaga);
  yield fork(deleteAddressSaga);
}

function* submitAddEditAddressSaga() {
  while (true) {
    const { payload }: ReturnType<typeof submitAddEditAddressAction> =
      yield take(submitAddEditAddressAction);
    yield put(toggleLoadingOverlay(true));
    const currentUserDetails: auth.currentUserDetails = yield select(
      (state: RootState) => state.auth.currentUser
    );
    const addressActionType: string = yield select(
      (state: RootState) => state.account.addressActionType
    );
    const isDirectAction: boolean = yield select(
      (state: RootState) => state.account.isDirectAction
    );
    yield put(updateStatusTitle(addressStatus[addressActionType].title));
    try {
      let currentAddresses: auth.addressData[] = [];
      let isAddressExist = false;
      if (currentUserDetails.addressBook) {
        currentAddresses = [...currentUserDetails.addressBook];
        isAddressExist = sameAddressDetector(currentAddresses, payload);
      }
      if (addressActionType === "Add") {
        if (!isAddressExist) {
          if (currentAddresses.length > 0) {
            if (payload.defaultOption === "1") {
              currentAddresses = removeDefaultAddressFunc(currentAddresses);
            }
          }
          currentAddresses.push(payload);
        }
      } else if (addressActionType === "Edit") {
        const selectedAddress: account.submitAddEditAddressPayload =
          yield select((state: RootState) => state.account.selectedAddress);
        const editIndex = currentAddresses.findIndex(
          (address) => address === selectedAddress
        );
        if (payload.defaultOption === "1") {
          currentAddresses = removeDefaultAddressFunc(currentAddresses);
        }
        currentAddresses[editIndex] = payload;
      }
      if (!isAddressExist || addressActionType === "Edit") {
        yield call(updateAddress, currentAddresses, currentUserDetails.uid);
      }
      yield put(getCurrentUserDetailsAction(currentUserDetails.uid));
      yield put(updateSelectedAddress(defaultAddressData));
      if (isDirectAction) {
        if (!isAddressExist || addressActionType === "Edit") {
          yield put(toggleSuccess(true));
          yield put(
            updateStatusMsg(addressStatus[addressActionType].successMsg)
          );
        } else {
          yield put(toggleSuccess(false));
          yield put(
            updateStatusMsg(
              "Duplicated address detected. Please add a different address."
            )
          );
        }
        yield put(toggleAddressModal(false));
        yield put(toggleLoadingOverlay(false));
        yield put(toggleEditAccDetailModal(false));
        yield put(toggleStatusModal(true));
      }
    } catch (error) {
      if (isDirectAction) {
        yield put(toggleSuccess(false));
        yield put(updateStatusMsg(addressStatus[addressActionType].failMsg));
        yield put(toggleLoadingOverlay(false));
        yield put(toggleStatusModal(true));
      }
    }
  }
}

function removeDefaultAddressFunc(
  addressList: account.submitAddEditAddressPayload[]
) {
  const removedDefault = addressList.map((address) => {
    if (address.defaultOption === "1") {
      // eslint-disable-next-line no-param-reassign
      address = { ...address, defaultOption: "0" };
    }
    return address;
  });
  return removedDefault;
}

function* deleteAddressSaga() {
  while (true) {
    yield take(deleteAddressAction);
    yield put(toggleLoadingOverlay(true));
    const selectedAddress: account.submitAddEditAddressPayload = yield select(
      (state: RootState) => state.account.selectedAddress
    );
    const currentUserDetails: auth.currentUserDetails = yield select(
      (state: RootState) => state.auth.currentUser
    );
    const currentAddressList = [...currentUserDetails.addressBook];
    yield put(updateStatusTitle("Delete Address"));
    try {
      const removeIndex = currentAddressList.findIndex(
        (address) => address === selectedAddress
      );
      currentAddressList.splice(removeIndex, 1);
      yield call(updateAddress, currentAddressList, currentUserDetails.uid);
      yield put(getCurrentUserDetailsAction(currentUserDetails.uid));
      yield put(updateSelectedAddress(defaultAddressData));
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg("Your address has been successfully deleted!"));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleDeleteAddressConfirmationModal(false));
      yield put(toggleStatusModal(true));
    } catch (error) {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg("Your address has failed to be deleted!"));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function sameAddressDetector(
  currentAddressList: account.submitAddEditAddressPayload[],
  insertAddress: account.submitAddEditAddressPayload
) {
  const foundAddress = currentAddressList.findIndex((address) => {
    const sameAddressLine1 =
      address.addressLine1 === insertAddress.addressLine1;
    const sameAddressLine2 =
      address.addressLine2 === insertAddress.addressLine2;
    const samePostcode = address.postcode === insertAddress.postcode;
    const sameCity = address.city === insertAddress.city;
    const sameState = address.state === insertAddress.state;
    const sameForeignState =
      address.outsideMalaysiaState === insertAddress.outsideMalaysiaState;
    const sameCountry = address.country === insertAddress.country;

    return (
      sameAddressLine1 &&
      sameAddressLine2 &&
      samePostcode &&
      sameCity &&
      sameState &&
      sameForeignState &&
      sameCountry
    );
  });

  return foundAddress !== -1;
}
