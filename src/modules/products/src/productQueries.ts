import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { defaultProductListPayload } from "@modules/products/src/productConstants";
import { productLocalStorageKeys } from "@utils/localStorageKeys";
import dayjs from "dayjs";
import { navigate } from "gatsby";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getAllProducts,
  getAvailablePromoCodes,
  getOrderCount,
  getOrderHistory,
  getProductCategories,
  getSortOptions,
  sendPaymentEmailApi,
  updateOrderCount,
  updateOrderHistory,
} from "./productApis";

export const productQueriesKeys = {
  getOrderCount: "getOrderCount",
  updateOrderCount: "updateOrderCount",
  getAvailablePromoCodes: "getAvailablePromoCodes",
};

export const useOrderCount = () =>
  useQuery(productQueriesKeys.getOrderCount, async () =>
    (await getOrderCount()).val()
  );

export const useSubmitOrder = (onSuccessOrder: () => void) => {
  const { data: orderCount } = useOrderCount();
  const { data: orderHistory } = useOrderHistory();

  const { mutate: saveOrder } = useUpdateOrderHistory();

  const queryClient = useQueryClient();
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  const onUpdate = async (payload: products.sendPaymentEmailPayload) => {
    // update order count
    await updateOrderCount(orderCount + 1);
    // update promo code used for the user
    if (payload.saveShippingInfo) {
      const addressData = {
        fullName: payload.fullName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2 || "",
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        outsideMalaysiaState: payload.outsideMalaysiaState || "",
        country: payload.country,
      };
    } else {
      localStorage.removeItem(productLocalStorageKeys.SHIPPING_INFO);
    }
    // save order to db if logged in
    const orderData: products.saveOrderPayload = {
      ...payload,
      createdAt: dayjs().format("DD/MM/YYYY"),
      status: "Pending Payment",
    };
    const currentOrderHistory = [...(orderHistory || []), orderData];

    saveOrder(currentOrderHistory);

    onSuccessOrder();
    return sendPaymentEmailApi(payload);
  };

  return useMutation("submitOrder", onUpdate, {
    onSuccess: () => {
      toggleSuccess(true);
      updateTitle("Your order is confirmed");
      updateMsg(
        "An email regarding payment details will be sent to your email shortly. Please kindly proceed your payment within 24 hours."
      );
      toggleVisible(true);
      navigate("/");
    },
    onError: () => {
      toggleSuccess(false);
      updateTitle("Order confirmation failed");
      updateMsg(
        "Please check your internet connection or contact us at hello@yjartjournal.com for assistance."
      );
      toggleVisible(true);
    },
  });
};

export const useAvailablePromoCodes = () =>
  useQuery(productQueriesKeys.getAvailablePromoCodes, async () => {
    const response: products.availablePromoCodeData[] = (
      await getAvailablePromoCodes()
    ).val();
    return response;
  });

export const useOrderHistory = () =>
  useQuery("getOrderHistory", async () => {
    const orderHistory: products.saveOrderPayload[] = (
      await getOrderHistory()
    ).val();

    return orderHistory;
  });

export const useUpdateOrderHistory = () =>
  useMutation("updateOrderHistory", updateOrderHistory);

export const useProductList = (
  payload: products.getAllProductPayload = defaultProductListPayload
) =>
  useQuery(
    ["getAllProducts", payload.sortId],
    async () => (await getAllProducts(payload)).data.data
  );

export const useSortOptions = () =>
  useQuery("getSortOptions", async () => (await getSortOptions()).data.data);

export const useProductCategories = () =>
  useQuery(
    "getProductCategories",
    async () => (await getProductCategories()).data.data
  );
