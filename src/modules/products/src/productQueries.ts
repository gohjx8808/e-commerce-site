import { defaultProductListPayload } from "@modules/products/src/productConstants";
import { useQuery } from "react-query";
import {
  getAllProducts,
  getProductCategories,
  getSortOptions,
} from "./productApis";

export const useProductList = (
  payload: products.getAllProductPayload = defaultProductListPayload
) =>
  useQuery(
    ["getAllProducts", payload.sortId],
    async () => (await getAllProducts(payload)).data.data
  );

export const useSortOptions = () =>
  useQuery("getSortOptions", async () => (await getSortOptions()).data.data);

export const useProductCategories = () =>
  useQuery(
    "getProductCategories",
    async () => (await getProductCategories()).data.data
  );
