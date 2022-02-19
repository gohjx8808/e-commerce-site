import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

export const getPrevOrderCount = () => (firebase.database().ref('orderCount').once('value'));

export const updateOrderCount = (currentOrderCount:number) => firebase.database().ref('orderCount').set(currentOrderCount);

export const sendPaymentEmailApi = (emailData:products.sendPaymentEmailPayload) => (
  window.fetch('https://send-checkout-email.gohjx8808.workers.dev', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'content-type': 'application/json',
      'accept-type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
);

export const getAvailablePromocodes = () => (firebase.database().ref('promoCodes').once('value'));

export const updatePromoCodeUsed = (updatedDetails:auth.currentUserDetails) => firebase.database().ref(`users/${updatedDetails.uid}`).set(updatedDetails);
