import firebase from "gatsby-plugin-firebase";
import { call, fork, put, take } from "redux-saga/effects";
import { toggleLoadingOverlay } from "../../overlay/src/overlayReducer";
import {
  toggleStatusModal,
  updateStatusMsg,
  updateStatusTitle,
} from "../../status/src/statusReducer";
import { getCurrentUserDetails } from "./authApis";
import { getCurrentUserDetailsAction, storeSignedInUser } from "./authReducer";

export default function* authRuntime() {
  yield fork(getUserDetailSaga);
}

function* getUserDetailSaga() {
  while (true) {
    const { payload }: ReturnType<typeof getCurrentUserDetailsAction> =
      yield take(getCurrentUserDetailsAction);
    try {
      const userDetails: firebase.database.DataSnapshot = yield call(
        getCurrentUserDetails,
        payload
      );
      const storedDetails: auth.currentUserDetails = {
        ...userDetails.val(),
        uid: payload,
      };
      yield put(storeSignedInUser(storedDetails));
    } catch (error) {
      yield put(updateStatusTitle("Error"));
      yield put(updateStatusMsg("Error occur. Please try again."));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
