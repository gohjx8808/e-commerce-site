import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useUID } from "@hooks";
import {
  accountLocalStorageKeys,
  productLocalStorageKeys,
} from "@utils/localStorageKeys";
import dayjs from "dayjs";
import { navigate } from "gatsby";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAddEditAddress } from "../../account/src/accountQueries";
import {
  getCurrentUserDetailsKey,
  useUserDetails,
} from "../../auth/src/authQueries";
import {
  getAllProducts,
  getAvailablePromoCodes,
  getOrderCount,
  getOrderHistory,
  getProductDetails,
  getSortOptions,
  sendPaymentEmailApi,
  updateOrderCount,
  updateOrderHistory,
  updatePromoCodeUsed,
} from "./productApi";

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
  const { data: userDetails } = useUserDetails();
  const { data: orderHistory } = useOrderHistory();
  const uid = useUID();

  const { mutate: addAddress } = useAddEditAddress(
    { actionType: "Add", selectedAddress: null, isModalOpen: false },
    () => {},
    false
  );
  const { mutate: saveOrder } = useUpdateOrderHistory();

  const queryClient = useQueryClient();
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  const onUpdate = async (payload: products.sendPaymentEmailPayload) => {
    // update order count
    await updateOrderCount(orderCount + 1);
    // update promo code used for the user
    if (payload.promoCode) {
      const usedPromoCode = [...(userDetails?.usedPromoCodes || [])];
      usedPromoCode.push(payload.promoCode);
      await updatePromoCodeUsed(usedPromoCode);
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
    }
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
      const saveAddressData: auth.addressData = {
        ...addressData,
        defaultOption: "0",
        tag: "",
      };
      const shippingInfo: products.submitShippingInfoPayload = {
        ...addressData,
        promoCode: "",
        note: "",
        saveShippingInfo: payload.saveShippingInfo,
        paymentOptions: payload.paymentOptions,
      };
      // add address to user's address book if authorized
      if (localStorage.getItem(accountLocalStorageKeys.UID)) {
        addAddress(saveAddressData);
      } else {
        // save to local storage for unauthorized user
        localStorage.setItem(
          productLocalStorageKeys.SHIPPING_INFO,
          JSON.stringify(shippingInfo)
        );
      }
    } else {
      localStorage.removeItem(productLocalStorageKeys.SHIPPING_INFO);
    }
    // save order to db if logged in
    if (uid) {
      const orderData: products.saveOrderPayload = {
        ...payload,
        createdAt: dayjs().format("DD/MM/YYYY"),
        status: "Pending Payment",
      };
      const currentOrderHistory = [...(orderHistory || []), orderData];

      saveOrder(currentOrderHistory);
    }
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

export const useOrderHistory = () => {
  const uid = useUID();

  return useQuery(
    "getOrderHistory",
    async () => {
      const orderHistory: products.saveOrderPayload[] = (
        await getOrderHistory()
      ).val();

      return orderHistory;
    },
    { enabled: !!uid }
  );
};

export const useUpdateOrderHistory = () =>
  useMutation("updateOrderHistory", updateOrderHistory);

export const useProductList = (payload: products.getAllProductPayload) =>
  useQuery(
    ["getAllProducts", payload.sortBy],
    async () => (await getAllProducts(payload)).data
  );

export const useSortOptions = () =>
  useQuery("getSortOptions", async () => (await getSortOptions()).data);

export const useProductDetails = (payload: products.getProductDetailsPayload) =>
  useQuery(
    ["getProductDetails", payload.productId],
    async () => (await getProductDetails(payload)).data
  );
