import { all, call } from 'redux-saga/effects';
import accountRuntime from './modules/account/src/accountSaga';
import authSagas from './modules/auth/src/authSagas';
import productRuntime from './modules/products/src/productSagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(productRuntime),
    call(accountRuntime),
  ]);
}
