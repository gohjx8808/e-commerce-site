import { useProductList } from "@modules/products/src/productQueries";

const useFlattenProducts = () => {
  const { data: allProducts } = useProductList();

  if (allProducts) {
    const { products } = allProducts;
    const categories = Object.keys(products);
    const flattenProducts = categories.reduce(
      (carry: products.productData[], category) => [
        ...carry,
        ...products[category],
      ],
      []
    );

    return flattenProducts;
  }

  return null;
};

export default useFlattenProducts;
