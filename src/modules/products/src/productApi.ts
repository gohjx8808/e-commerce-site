import firebase from 'gatsby-plugin-firebase';
import 'firebase/database';

export const getPrevOrderCount = () => (firebase.database().ref('orderCount').once('value'));

export const updateOrderCount = (currentOrderCount:number) => firebase.database().ref('orderCount').set(currentOrderCount);

export const sendPaymentEmailApi = (emailData:products.sendEmailPayloadProcessed) => (
  window.fetch('/api/sendGrid/sendPaymentEmail', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
);

export const getAvailablePromocodes = () => (firebase.database().ref('promoCodes').once('value'));

export const updatePromoCodeUsed = (updatedDetails:auth.currentUserDetails) => firebase.database().ref(`users/${updatedDetails.uid}`).set(updatedDetails);
