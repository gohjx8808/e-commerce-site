import firebase from 'gatsby-plugin-firebase';
import { call, fork, take } from 'redux-saga/effects';
import { registerUser, saveUserDetails } from './authApis';
import { authSlice, submitSignUp } from './authReducer';

export default function* authSaga() {
  yield fork(submitSignUpSaga);
}

function* submitSignUpSaga() {
  while (true) {
    const { payload }:ReturnType<typeof authSlice.actions.submitSignUp> = yield take(submitSignUp);
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
    } catch (error) {
      console.log(error);
    }
  }
}
