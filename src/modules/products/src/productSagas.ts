import { navigate } from '@reach/router';
import firebase from 'gatsby-plugin-firebase';
import {
  all,
  call, fork, put, take,
} from 'redux-saga/effects';
import { defaultAddressData } from '../../../utils/constants';
import { updateSelectedAddress } from '../../account/src/accountReducer';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import { getPrevOrderCount, sendPaymentEmailApi, updateOrderCount } from './productApi';
import {
  removeItemFromCart, saveShippingInfo, sendPaymentEmailAction, updatePrevOrderCount,
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
      yield call(sendPaymentEmailApi, payload);
      yield call(updateOrderCount, payload.currentOrderCount);
      const toBeRemovedItems = payload.selectedCheckoutItems;
      yield all(toBeRemovedItems.map((item) => put(removeItemFromCart(item.id))));
      if (payload.saveShippingInfo) {
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
          saveShippingInfo: payload.saveShippingInfo,
          paymentOptions: payload.paymentOptions,
        };
        yield put(saveShippingInfo(shippingInfo));
      } else {
        const emptyShippingInfo:products.submitShippingInfoPayload = {
          fullName: '',
          email: '',
          phoneNumber: '60',
          addressLine1: '',
          addressLine2: '',
          postcode: '',
          city: '',
          state: { label: '', value: '' },
          outsideMalaysiaState: '',
          country: '',
          saveShippingInfo: false,
          paymentOptions: '',
        };
        yield put(saveShippingInfo(emptyShippingInfo));
      }
      yield put(updateSelectedAddress(defaultAddressData));
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
