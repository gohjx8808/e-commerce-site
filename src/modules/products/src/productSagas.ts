import firebase from 'gatsby-plugin-firebase';
import { call, put } from 'redux-saga/effects';
import { getPrevOrderCount } from './productApi';
import { updatePrevOrderCount } from './productReducers';

export default function* productRuntime() {
  const response:firebase.database.DataSnapshot = yield call(getPrevOrderCount);
  const prevOrderCount:number = response.val();
  yield put(updatePrevOrderCount(prevOrderCount));
}
