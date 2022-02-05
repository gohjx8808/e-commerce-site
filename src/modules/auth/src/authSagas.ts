import { navigate } from 'gatsby';
import firebase from 'gatsby-plugin-firebase';
import {
  call, fork, put, take,
} from 'redux-saga/effects';
import routeNames from '../../../utils/routeNames';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';
import {
  getCurrentUserDetails, registerUser, resetPassword, saveUserDetails, signIn, signOut,
} from './authApis';
import {
  clearCurrentUser,
  getCurrentUserDetailsAction,
  signOutAction,
  storeSignedInUser,
  submitForgotPassword,
  submitSignIn,
  submitSignUp,
  toggleSignOutConfirmationModal,
} from './authReducer';

export default function* authRuntime() {
  yield fork(submitSignUpSaga);
  yield fork(submitLoginSaga);
  yield fork(getUserDetailSaga);
  yield fork(logoutSaga);
  yield fork(submitForgotPasswordSaga);
}

function* submitSignUpSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitSignUp> = yield take(submitSignUp);
    yield put(toggleLoadingOverlay(true));
    yield put(updateStatusTitle('Registration'));
    try {
      const registeredUser:firebase.auth.UserCredential = yield call(registerUser, payload);
      const userID = registeredUser.user?.uid!;
      const userDetails:auth.saveUserDetailsPayload = {
        email: payload.email,
        dob: payload.dob,
        gender: payload.gender.value,
        fullName: payload.fullName,
        phoneNumber: payload.phoneNumber,
        admin: false,
        customer: true,
      };
      yield call(saveUserDetails, userID, userDetails);
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Your registration is successful! Please login using your credentials.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
      navigate(routeNames.login);
    } catch (error:any) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        yield put(updateStatusMsg('The provided email is already in use by an existing user. '
        + 'Please register using another email or login using the correct credentials.'));
      } else if (errorCode === 'auth/invalid-email') {
        yield put(updateStatusMsg('Invalid email! Please try again.'));
      } else {
        yield put(updateStatusMsg('Your registration has failed! Please try again.'));
      }
      yield put(toggleSuccess(false));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function* submitLoginSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitSignIn> = yield take(submitSignIn);
    yield put(toggleLoadingOverlay(true));
    try {
      const response:firebase.auth.UserCredential = yield call(signIn, payload);
      const userDetails:firebase.database.DataSnapshot = yield call(
        getCurrentUserDetails, response.user?.uid!,
      );
      if (userDetails.val().customer) {
        yield put(getCurrentUserDetailsAction(response.user?.uid!));
        yield put(toggleLoadingOverlay(false));
        navigate('/');
      } else {
        yield call(signOut);
        yield put(clearCurrentUser());
        throw new Error('No permission');
      }
    } catch (error) {
      yield put(updateStatusTitle('Log In'));
      yield put(updateStatusMsg('Invalid credentials! Please try again.'));
      yield put(toggleSuccess(false));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function* getUserDetailSaga() {
  while (true) {
    const { payload }:ReturnType<typeof getCurrentUserDetailsAction> = yield take(
      getCurrentUserDetailsAction,
    );
    try {
      const userDetails:firebase.database.DataSnapshot = yield call(
        getCurrentUserDetails, payload,
      );
      const storedDetails:auth.currentUserDetails = {
        ...userDetails.val(), uid: payload,
      };
      yield put(storeSignedInUser(storedDetails));
    } catch (error) {
      yield put(updateStatusTitle('Error'));
      yield put(updateStatusMsg('Error occur. Please try again.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function* logoutSaga() {
  while (true) {
    yield take(signOutAction);
    yield put(toggleLoadingOverlay(true));
    yield put(updateStatusTitle('Logout'));
    try {
      yield call(signOut);
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Successfully logout!'));
      yield put(clearCurrentUser());
      yield put(toggleLoadingOverlay(false));
      yield put(toggleSignOutConfirmationModal(false));
      yield put(toggleStatusModal(true));
      navigate('/');
    } catch {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg('Network error! Please try again.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}

function* submitForgotPasswordSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitForgotPassword> = yield take(submitForgotPassword);
    yield put(toggleLoadingOverlay(true));
    yield put(updateStatusTitle('Forgot Password'));
    try {
      yield call(resetPassword, payload);
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('An email to reset your password has been sent to your registered email address.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
      navigate(routeNames.login);
    } catch (error:any) {
      if (error.code === 'auth/user-not-found') {
        yield put(updateStatusMsg('The email address is not registered. Please insert a registered email address!'));
      } else {
        yield put(updateStatusMsg('Network error! Please try again.'));
      }
      yield put(toggleSuccess(false));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
