import { postRequest } from "@utils/apiUtils";

// eslint-disable-next-line import/prefer-default-export
export const submitFeedback = (payload: feedback.submitFeedbackFormPayload) =>
  postRequest("feedbacks/submit", payload);
