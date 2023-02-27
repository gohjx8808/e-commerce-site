import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { useQuery } from "react-query";
import { getAddressList, getStateOptions } from "./addressApis";

export const useStateOptions = () =>
  useQuery("getStateOptions", async () => (await getStateOptions()).data.data);

export const useAddressList = () =>
  useQuery("getAddressList", async () => (await getAddressList()).data.data, {
    enabled: !!localStorage.getItem(authLocalStorageKeys.TOKEN),
  });
