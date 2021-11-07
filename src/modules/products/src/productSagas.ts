import firebase from 'gatsby-plugin-firebase';
import {
  all,
  call, fork, put, select, take,
} from 'redux-saga/effects';
import { navigate } from 'gatsby';
import { RootState } from '../../../store';
import { emptyShippingInfo } from '../../../utils/constants';
import {
  submitAddEditAddressAction, toggleIsDirectAction, updateAddressActionType,
} from '../../account/src/accountReducer';
import { getCurrentUserDetailsAction } from '../../auth/src/authReducer';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import {
  getPrevOrderCount, sendPaymentEmailApi, updateOrderCount, updatePromoCodeUsed,
} from './productApi';
import {
  removeItemFromCart,
  saveShippingInfo,
  sendPaymentEmailAction,
  updatePrevOrderCount,
  updateSelectedCheckoutItemsID,
} from './productReducers';

export default function* productRuntime() {
  yield fork(getPrevOrderCountSaga);
  yield fork(sendPaymentEmailSaga);
}

function* getPrevOrderCountSaga() {
  const response:firebase.database.DataSnapshot = yield call(getPrevOrderCount);
  const prevOrderCount:number = response.val();
  yield put(updatePrevOrderCount(prevOrderCount));
}

function* sendPaymentEmailSaga() {
  while (true) {
    const { payload }:ReturnType<
      typeof sendPaymentEmailAction
    > = yield take(sendPaymentEmailAction);
    yield put(toggleLoadingOverlay(true));
    try {
      const currentUserDetails:auth.currentUserDetails = yield select(
        (state:RootState) => state.auth.currentUser,
      );
      yield call(sendPaymentEmailApi, payload);
      yield call(updateOrderCount, payload.currentOrderCount);
      if (payload.promoCode) {
        let updatedUserDetails = { ...currentUserDetails };
        if (currentUserDetails.usedPromocode) {
          updatedUserDetails = {
            ...updatedUserDetails,
            usedPromocode: [...updatedUserDetails.usedPromocode, payload.promoCode],
          };
        } else {
          updatedUserDetails = { ...updatedUserDetails, usedPromocode: [payload.promoCode] };
        }
        yield call(updatePromoCodeUsed, updatedUserDetails);
        yield put(getCurrentUserDetailsAction(currentUserDetails.uid));
      }
      const toBeRemovedItems = payload.selectedCheckoutItems;
      yield all(toBeRemovedItems.map((item) => put(removeItemFromCart(item.id))));
      if (payload.saveShippingInfo) {
        const saveAddressData:account.submitAddEditAddressPayload = {
          fullName: payload.fullName,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          addressLine1: payload.addressLine1,
          addressLine2: payload.addressLine2,
          postcode: payload.postcode,
          city: payload.city,
          state: payload.state,
          outsideMalaysiaState: payload.outsideMalaysiaState || '',
          country: payload.country,
          defaultOption: '0',
          tag: '',
        };
        const shippingInfo:products.submitShippingInfoPayload = {
          fullName: payload.fullName,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          addressLine1: payload.addressLine1,
          addressLine2: payload.addressLine2,
          postcode: payload.postcode,
          city: payload.city,
          state: payload.state,
          outsideMalaysiaState: payload.outsideMalaysiaState,
          country: payload.country,
          promoCode: '',
          note: '',
          saveShippingInfo: payload.saveShippingInfo,
          paymentOptions: payload.paymentOptions,
        };
        if (currentUserDetails.uid !== '') {
          yield put(updateAddressActionType('Add'));
          yield put(toggleIsDirectAction(false));
          yield put(submitAddEditAddressAction(saveAddressData));
        } else {
          yield put(saveShippingInfo(shippingInfo));
        }
      } else {
        yield put(saveShippingInfo(emptyShippingInfo));
      }
      yield put(updateSelectedCheckoutItemsID([]));
      yield put(toggleSuccess(true));
      yield put(updateStatusTitle('Your order is confirmed'));
      yield put(updateStatusMsg('An email regarding payment details will be sent to your email shortly. Please kindly proceed your payment within 24 hours.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
      navigate('/');
    } catch (e) {
      yield put(toggleSuccess(false));
      yield put(updateStatusTitle(''));
      yield put(updateStatusMsg('Please check your internet connection or contact us at yj.artjournal@gmail.com for assistance.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
