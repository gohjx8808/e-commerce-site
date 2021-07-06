import firebase from 'gatsby-plugin-firebase';
import {
  call, fork, put, take,
} from 'redux-saga/effects';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import { registerUser, saveUserDetails } from './authApis';
import { authSlice, submitSignUp } from './authReducer';

export default function* authSaga() {
  yield fork(submitSignUpSaga);
}

function* submitSignUpSaga() {
  while (true) {
    const { payload }:ReturnType<typeof authSlice.actions.submitSignUp> = yield take(submitSignUp);
    yield put(updateStatusTitle('Registration'));
    try {
      const registeredUser:firebase.auth.UserCredential = yield call(registerUser, payload);
      const userID = registeredUser.user?.uid!;
      const userDetails:auth.saveUserDetailsPayload = {
        email: payload.email,
        dob: payload.dob,
        gender: payload.gender.value,
        fullName: payload.fullName,
      };
      yield call(saveUserDetails, userID, userDetails);
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Your registration is successful! Please login using your credentials.'));
      yield put(toggleStatusModal(true));
    } catch (error) {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg('Your registration has failed! Please try again.'));
      yield put(toggleStatusModal(true));
    }
  }
}
