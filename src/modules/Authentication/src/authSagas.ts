import { fork, take } from 'redux-saga/effects';
import { submitSignUp } from './authReducer';

export default function* () {
  yield take(submitSignUp);
  console.log('nooooo');
}
