import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { useQuery } from "react-query";
import { getAddressList } from "./addressApis";

// eslint-disable-next-line import/prefer-default-export
export const useAddressList = () =>
  useQuery("getAddressList", async () => (await getAddressList()).data.data, {
    enabled: !!localStorage.getItem(authLocalStorageKeys.TOKEN),
  });
