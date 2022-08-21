import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  accountLocalStorageKeys,
  productLocalStorageKeys,
} from "@utils/localStorageKeys";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "./utils/helper";

const theme = useTheme;

export const useXsDownMediaQuery = () =>
  useMediaQuery(theme().breakpoints.only("xs"));

export const useUID = () => {
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(getLocalStorageItem(accountLocalStorageKeys.UID));
  }, []);

  return uid;
};

export const usePathname = () => {
  const [pathname, setPathname] = useState<string>("/");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
};

export const usePrevShippingInfo = () => {
  const [prevShippingInfo, setPrevShippingInfo] =
    useState<products.submitShippingInfoPayload>({
      fullName: "",
      email: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      postcode: "",
      city: "",
      state: "",
      outsideMalaysiaState: "",
      country: "",
      promoCode: "",
      note: "",
      saveShippingInfo: false,
      paymentOptions: "",
    });

  useEffect(() => {
    setPrevShippingInfo(
      getLocalStorageItem(productLocalStorageKeys.SHIPPING_INFO)
    );
  }, []);

  return prevShippingInfo;
};
