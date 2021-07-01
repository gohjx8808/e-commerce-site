import { all, call } from 'redux-saga/effects';
import authSagas from './modules/Authentication/src/authSagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
  ]);
}
