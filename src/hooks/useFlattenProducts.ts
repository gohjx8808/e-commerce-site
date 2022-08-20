import { useMemo } from "react";
import { useProductList } from "@modules/products/src/productQueries";

const useFlattenProducts = () => {
  const { data: allProducts } = useProductList();

  const flattenProducts = useMemo(() => {
    if (allProducts) {
      const { products } = allProducts;
      const categories = Object.keys(products);
      const flatten = categories.reduce(
        (carry: products.productData[], category) => [
          ...carry,
          ...products[category],
        ],
        []
      );
      return flatten;
    }
    return null;
  }, [allProducts]);

  return flattenProducts;
};

export default useFlattenProducts;
