import { all, call } from 'redux-saga/effects';
import accountRuntime from './modules/account/src/accountSaga';
import authRuntime from './modules/auth/src/authSagas';
import productRuntime from './modules/products/src/productSagas';

export default function* rootSaga() {
  yield all([
    call(authRuntime),
    call(productRuntime),
    call(accountRuntime),
  ]);
}
