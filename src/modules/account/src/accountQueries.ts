/* eslint-disable import/prefer-default-export */
import { authLocalStorageKeys } from "@utils/localStorageKeys";
import { useQuery } from "react-query";
import { getAccountDetails } from "./accountApis";

export const useAccountDetails = () =>
  useQuery(
    "getAccountDetails",
    async () => (await getAccountDetails()).data.data,
    {
      enabled: !!localStorage.getItem(authLocalStorageKeys.TOKEN),
    }
  );
