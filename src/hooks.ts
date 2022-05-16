import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  accountLocalStorageKeys,
  productLocalStorageKeys,
} from "@utils/localStorageKeys";
import { useEffect, useState } from "react";
import { customJSONParse } from "./utils/helper";

const theme = useTheme;

export const useXsDownMediaQuery = () =>
  useMediaQuery(theme().breakpoints.only("xs"));

export const useAllProducts = () => {
  const [allProducts, setAllProducts] = useState<
    products.innerProductQueryData[]
  >([]);

  useEffect(() => {
    setAllProducts(
      customJSONParse(localStorage.getItem(productLocalStorageKeys.PRODUCTS))
    );
  }, []);

  return allProducts;
};

export const useUID = () => {
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setUid(customJSONParse(localStorage.getItem(accountLocalStorageKeys.UID)));
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
      customJSONParse(
        localStorage.getItem(productLocalStorageKeys.SHIPPING_INFO)
      )
    );
  }, []);

  return prevShippingInfo;
};
