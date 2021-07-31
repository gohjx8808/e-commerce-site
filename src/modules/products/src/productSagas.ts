import firebase from 'gatsby-plugin-firebase';
import {
  call, fork, put, take,
} from 'redux-saga/effects';
import { getPrevOrderCount, sendPaymentEmailApi, updateOrderCount } from './productApi';
import { sendPaymentEmailAction, updatePrevOrderCount } from './productReducers';

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
    try {
      yield call(sendPaymentEmailApi, payload);
      yield call(updateOrderCount, payload.currentOrderCount);
    } catch (e) {
      console.log(e);
    }
  }
}
