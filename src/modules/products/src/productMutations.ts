/* eslint-disable import/prefer-default-export */
import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { useMutation } from "react-query";
import { useContext } from "react";
import { postCalculateShippingFee } from "./productApis";

export const useCalculateShippingFee = (
  setShippingFee: (value: number) => void
) => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);

  return useMutation("calculateShippingFee", postCalculateShippingFee, {
    onSuccess: (response) => {
      setShippingFee(response.data.data.shippingFee);
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
