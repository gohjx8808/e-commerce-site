/* eslint-disable import/prefer-default-export */
import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useMutation } from "react-query";
import { useContext } from "react";
import { AxiosError } from "axios";
import { navigate } from "gatsby";
import { ProductContext } from "@contextProvider/ProductContextProvider";
import {
  postCalculateShippingFee,
  postCheckout,
  postVerifyPromoCode,
} from "./productApis";

export const useCalculateShippingFee = (
  setShippingFee: (value: products.shippingFeeData) => void
) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("calculateShippingFee", postCalculateShippingFee, {
    onSuccess: (response) => {
      setShippingFee({
        shippingFee: response.data.data.shippingFee,
        valid: true,
      });
    },
    onError: () => {
      toggleSuccess(false);
      updateTitle("Shipping fee calculation failed");
      updateMsg(
        "Please check your internet connection or contact us at hello@yjartjournal.com for assistance."
      );
      toggleVisible(true);
    },
  });
};

export const useVerifyPromoCode = (
  setPromoCodeApplied: (value?: products.promoCodeData) => void,
  setPromoCodeError: (value: string) => void
) =>
  useMutation("verifyPromoCode", postVerifyPromoCode, {
    onSuccess: (response) => {
      setPromoCodeApplied(response.data.data);
      setPromoCodeError("");
    },
    onError: (error: AxiosError<customErrorData>) => {
      setPromoCodeError(
        error.response?.data.message ||
          "Please check your internet connection or contact us at hello@yjartjournal.com for assistance."
      );
      setPromoCodeApplied(undefined);
    },
  });

export const useCheckout = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  const { clearSelectedCheckoutItem, removeCartItem } =
    useContext(ProductContext);

  return useMutation("submitOrder", postCheckout, {
    onSuccess: () => {
      toggleSuccess(true);
      updateTitle("Your order is confirmed");
      updateMsg(
        "An email regarding payment details will be sent to your email shortly. Please kindly proceed your payment within 24 hours."
      );
      toggleVisible(true);
      removeCartItem();
      clearSelectedCheckoutItem();
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
