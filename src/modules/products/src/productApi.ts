import { getRequest, postRequest } from "@utils/apiUtils";
import { accountLocalStorageKeys } from "@utils/localStorageKeys";
import "firebase/database";
import firebase from "gatsby-plugin-firebase";

export const getOrderCount = () =>
  firebase.database().ref("orderCount").once("value");

export const updateOrderCount = (currentOrderCount: number) =>
  firebase.database().ref("orderCount").set(currentOrderCount);

export const sendPaymentEmailApi = (
  emailData: products.sendPaymentEmailPayload
) =>
  window.fetch("https://send-checkout-email.gohjx8808.workers.dev", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "content-type": "application/json",
      "accept-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

export const getAvailablePromoCodes = () =>
  firebase.database().ref("promoCodes").once("value");

export const updatePromoCodeUsed = (usedPromoCode: string[]) => {
  const uid = localStorage.getItem(accountLocalStorageKeys.UID);
  return firebase
    .database()
    .ref(`users/${uid}/usedPromoCodes`)
    .set(usedPromoCode);
};

export const getOrderHistory = () => {
  const uid = localStorage.getItem(accountLocalStorageKeys.UID);
  return firebase.database().ref(`orderHistory/${uid}`).once("value");
};

export const updateOrderHistory = (payload: products.saveOrderPayload[]) => {
  const uid = localStorage.getItem(accountLocalStorageKeys.UID);
  return firebase.database().ref(`orderHistory/${uid}`).set(payload);
};

export const getAllProducts = (payload: products.getAllProductPayload) =>
  postRequest<products.allProducts>("products", payload);

export const getSortOptions = () =>
  getRequest<optionsData[]>("products/sort-by-options");

export const getProductDetails = (payload: products.getProductDetailsPayload) =>
  postRequest<products.productDetailsData>("products/details", payload);
