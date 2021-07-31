import firebase from 'gatsby-plugin-firebase';
import {
  call, fork, put, take,
} from 'redux-saga/effects';
import { getPrevOrderCount, updateOrderCount } from './productApi';
import { updateCurrentOrderCount, updatePrevOrderCount } from './productReducers';

export default function* productRuntime() {
  yield fork(getPrevOrderCountSaga);
  yield fork(updateCurrentOrderCountSaga);
}

function* getPrevOrderCountSaga() {
  const response:firebase.database.DataSnapshot = yield call(getPrevOrderCount);
  const prevOrderCount:number = response.val();
  yield put(updatePrevOrderCount(prevOrderCount));
}

function* updateCurrentOrderCountSaga() {
  const { payload } = yield take(updateCurrentOrderCount);
  yield call(updateOrderCount, payload);
}
