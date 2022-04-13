import { all, call } from 'redux-saga/effects';
import productRuntime from './modules/products/src/productSagas';

export default function* rootSaga() {
  yield all([
    call(productRuntime),
  ]);
}
