import { all, call } from 'redux-saga/effects';
import feedbackRuntime from './modules/feedback/src/feedbackSagas';
import productRuntime from './modules/products/src/productSagas';

export default function* rootSaga() {
  yield all([
    call(productRuntime),
    call(feedbackRuntime),
  ]);
}
