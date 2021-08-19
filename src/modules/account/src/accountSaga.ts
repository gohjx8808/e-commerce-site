import {
  call, fork, put, select, take,
} from 'redux-saga/effects';
import { RootState } from '../../../store';
import { getCurrentUserDetailsAction } from '../../auth/src/authReducer';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import { submitAddNewAddress, submitEditAccDetail } from './accountApi';
import {
  submitAddAddressAction, submitEditAccDetailsAction, toggleAddressModal, toggleEditAccDetailModal,
} from './accountReducer';

export default function* accountRuntime() {
  yield fork(submitEditAccDetailsSaga);
  yield fork(submitAddAddressSaga);
}

function* submitEditAccDetailsSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitEditAccDetailsAction> = yield take(
      submitEditAccDetailsAction,
    );
    yield put(toggleLoadingOverlay(true));
    const currentUserDetails:auth.currentUserDetails = yield select(
      (state:RootState) => state.auth.currentUser,
    );
    yield put(updateStatusTitle('Edit Account Details'));
    try {
      yield call(submitEditAccDetail, payload, currentUserDetails.uid);
      yield put(getCurrentUserDetailsAction(currentUserDetails.uid));
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Your profile has been successfully updated!'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleEditAccDetailModal(false));
      yield put(toggleStatusModal(true));
    } catch {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg('Your profile has failed to be update!'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function* submitAddAddressSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitAddAddressAction> = yield take(
      submitAddAddressAction,
    );
    yield put(toggleLoadingOverlay(true));
    const currentUserDetails:auth.currentUserDetails = yield select(
      (state:RootState) => state.auth.currentUser,
    );
    let currentAddresses:account.finalSubmitAddEditAddressPayload[] = [];
    if (currentUserDetails.addressBook) {
      currentAddresses = currentUserDetails.addressBook;
    }
    currentAddresses.push(payload);
    try {
      yield call(submitAddNewAddress, currentAddresses, currentUserDetails.uid);
      yield put(getCurrentUserDetailsAction(currentUserDetails.uid));
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Your address has been successfully added!'));
      yield put(toggleAddressModal(false));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleEditAccDetailModal(false));
      yield put(toggleStatusModal(true));
    } catch (error) {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg('Your address has failed to add!'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
