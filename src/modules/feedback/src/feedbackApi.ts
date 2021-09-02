// eslint-disable-next-line import/prefer-default-export
export const sendFeedbackEmail = (payload:feedback.submitFeedbackFormPayload) => (
  window.fetch('api/sendGrid/sendFeedbackEmail', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
);
