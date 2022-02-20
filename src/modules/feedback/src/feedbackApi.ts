// eslint-disable-next-line import/prefer-default-export
export const sendFeedbackEmail = (payload:feedback.submitFeedbackFormPayload) => (
  window.fetch('https://send-feedback-email.gohjx8808.workers.dev', {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
);
