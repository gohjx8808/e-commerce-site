import { getRequest, postRequest } from "@utils/apiUtils";

export const getProductCategories = () =>
  getRequest<Response<string[]>>("products/categories");

export const getAllProducts = (payload: products.getAllProductPayload) =>
  postRequest<Response<products.productData[]>>("products", payload);

export const getSortOptions = () =>
  getRequest<Response<numberOptionsData[]>>("products/sort-options");

export const postCalculateShippingFee = (
  payload: products.calculateShippingFeePayload
) =>
  postRequest<Response<{ shippingFee: number }>>(
    "orders/calculate-shipping-fee",
    payload
  );

export const postVerifyPromoCode = (payload: products.verifyPromoCodePayload) =>
  postRequest<Response<products.promoCodeData>>(
    "orders/verify-promo-code",
    payload,
    true
  );

export const postCheckout = (payload: products.checkoutPayload) =>
  postRequest("orders/checkout", payload, true);
