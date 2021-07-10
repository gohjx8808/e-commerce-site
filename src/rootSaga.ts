import { all, call } from 'redux-saga/effects';
import authSagas from './modules/auth/src/authSagas';
import productRuntime from './modules/products/src/productSagas';

export default function* rootSaga() {
  yield all([
    call(authSagas),
    call(productRuntime),
  ]);
}
