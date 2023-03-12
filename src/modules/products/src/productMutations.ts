/* eslint-disable import/prefer-default-export */
import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useMutation } from "react-query";
import { useContext } from "react";
import { AxiosError } from "axios";
import { postCalculateShippingFee, postVerifyPromoCode } from "./productApis";

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
  setPromoCodeApplied: (value: products.promoCodeData | null) => void,
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
      setPromoCodeApplied(null);
    },
  });
