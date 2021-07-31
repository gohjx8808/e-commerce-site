import { navigate } from '@reach/router';
import firebase from 'gatsby-plugin-firebase';
import {
  all,
  call, fork, put, take,
} from 'redux-saga/effects';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import { getPrevOrderCount, sendPaymentEmailApi, updateOrderCount } from './productApi';
import { removeItemFromCart, sendPaymentEmailAction, updatePrevOrderCount } from './productReducers';

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
      yield put(toggleSuccess(true));
      yield put(updateStatusTitle('Your order is confirmed'));
      yield put(updateStatusMsg('An email regarding payment details will be sent to your email shortly. Please kindly proceed your payment within 24 hours.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
      navigate('/');
    } catch (e) {
      yield put(toggleSuccess(false));
      yield put(updateStatusTitle('Error'));
      yield put(updateStatusMsg('Please check your internet connection or contact us at yj.artjournal@gmail.com for assistance.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
