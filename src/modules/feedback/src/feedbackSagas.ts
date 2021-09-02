import { navigate } from 'gatsby';
import {
  fork, put, take, call,
} from 'redux-saga/effects';
import { sendFeedbackEmail } from './feedbackApi';
import { toggleLoadingOverlay } from '../../overlay/src/overlayReducer';
import { submitFeedback } from './feedbackReducer';
import {
  toggleStatusModal, toggleSuccess, updateStatusMsg, updateStatusTitle,
} from '../../status/src/statusReducer';

export default function* feedbackRuntime() {
  yield fork(submitFeedbackSaga);
}

function* submitFeedbackSaga() {
  while (true) {
    const { payload }:ReturnType<typeof submitFeedback> = yield take(submitFeedback);
    yield put(toggleLoadingOverlay(true));
    yield put(updateStatusTitle('Submit Feedback'));
    try {
      yield call(sendFeedbackEmail, payload);
      yield put(toggleSuccess(true));
      yield put(updateStatusMsg('Love to know that! Thank you for your precious feedback. Together we can make it better!'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
      navigate('/');
    } catch (error) {
      yield put(toggleSuccess(false));
      yield put(updateStatusMsg('Somethings wrong happened! Please try again.'));
      yield put(toggleLoadingOverlay(false));
      yield put(toggleStatusModal(true));
    }
  }
}
