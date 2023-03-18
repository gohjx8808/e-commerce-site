/* eslint-disable import/prefer-default-export */
import { useQuery } from "react-query";
import { getAccountDetails } from "./accountApis";

export const useAccountDetails = () =>
  useQuery(
    "getAccountDetails",
    async () => (await getAccountDetails()).data.data
  );
