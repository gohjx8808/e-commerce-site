import { accountLocalStorageKeys, productLocalStorageKeys } from "@utils/localStorageKeys";
import { navigate } from "gatsby";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../hooks";
import { useAddEditAddress } from "../../account/src/accountQueries";
import {
  getCurrentUserDetailsKey,
  useUserDetails
} from "../../auth/src/authQueries";
import {
  toggleStatusModal,
  toggleSuccess,
  updateStatusMsg,
  updateStatusTitle
} from "../../status/src/statusReducer";
import {
  getAvailablePromocodes,
  getOrderCount,
  sendPaymentEmailApi,
  updateOrderCount,
  updatePromoCodeUsed
} from "./productApi";

export const productQueriesKeys = {
  getOrderCount: "getOrderCount",
  updateOrderCount: "updateOrderCount",
  getAvailablePromocodes: "getAvailablePromocodes",
};

export const useOrderCount = () =>
  useQuery(productQueriesKeys.getOrderCount, async () =>
    (await getOrderCount()).val()
  );

export const useSubmitOrder = () => {
  const { data: orderCount } = useOrderCount();
  const { data: userDetails } = useUserDetails();
  const { mutate: addAddress } = useAddEditAddress(
    { actionType: "Add", selectedAddress: null },
    () => {},
    false
  );
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const onUpdate = async (payload: products.sendPaymentEmailPayload) => {
    // update order count
    await updateOrderCount(+orderCount);
    // update promo code used for the user
    if (payload.promoCode) {
      const usedPromocode = [...(userDetails?.usedPromocode || [])];
      usedPromocode.push(payload.promoCode);
      await updatePromoCodeUsed(usedPromocode);
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
    }
    // const toBeRemovedItems = payload.selectedCheckoutItems;
    // yield all(
    //   toBeRemovedItems.map((item) => put(removeItemFromCart(item.id)))
    // );
    if (payload.saveShippingInfo) {
      const addressData = {
        fullName: payload.fullName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        addressLine1: payload.addressLine1,
        addressLine2: payload.addressLine2,
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
      if (localStorage.getItem(accountLocalStorageKeys.uid)) {
        addAddress(saveAddressData);
      } else {
        // save to local storage for unauthorized user
        localStorage.setItem(
          productLocalStorageKeys.shippingInfo,
          JSON.stringify(shippingInfo)
        );
      }
    } else {
      localStorage.removeItem(productLocalStorageKeys.shippingInfo);
    }
    return sendPaymentEmailApi(payload);
    // dispatch(updateSelectedCheckoutItemsID([]));
  };

  return useMutation("submitOrder", onUpdate, {
    onSuccess: () => {
      dispatch(toggleSuccess(true));
      dispatch(updateStatusTitle("Your order is confirmed"));
      dispatch(
        updateStatusMsg(
          "An email regarding payment details will be sent to your email shortly. Please kindly proceed your payment within 24 hours."
        )
      );
      dispatch(toggleStatusModal(true));
      navigate("/");
    },
    onError: () => {
      dispatch(toggleSuccess(false));
      dispatch(updateStatusTitle("Order confirmation failed"));
      dispatch(
        updateStatusMsg(
          "Please check your internet connection or contact us at hello@yjartjournal.com for assistance."
        )
      );
      dispatch(toggleStatusModal(true));
    },
  });
};

export const useAvailablePromocodes = () =>
  useQuery(productQueriesKeys.getAvailablePromocodes, async () =>
    (await getAvailablePromocodes()).val()
  );
