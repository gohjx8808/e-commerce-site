import Grid from '@material-ui/core/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import ProductCard from './ProductCard';

const Products = () => {
  const [allProduct, setAllProduct] = useState<products.productData[]>([]);
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
  const allPrices = useStaticQuery(graphql`
    query ProductPrices {
      prices: allStripePrice(
        filter: { active: { eq: true } }
        sort: { fields: [unit_amount] }
      ) {
        edges {
          node {
            unit_amount
            unit_amount_decimal
            product {
              id
              images
              localFiles{
                childImageSharp{
                  gatsbyImageData
                }
              }
              name
              type
            }
            active
            currency
            id
          }
        }
      }
    }`);

  useEffect(() => {
    const extractedPrices:products.queryProductData[] = allPrices.prices.edges;
    const tempProduct = [] as products.productData[];
    extractedPrices.forEach((price) => {
      const realPrice = price.node;
      const extractedProduct = realPrice.product;
      const { product, ...otherDetail } = realPrice;
      extractedProduct!.prices = otherDetail;
      tempProduct.push(extractedProduct!);
    });
    setAllProduct(tempProduct);
  }, [allPrices]);

  const filterProduct = (product:products.productData) => {
    if (productFilterKeyword) {
      return product.name.includes(productFilterKeyword);
    }
    return true;
  };

  return (
    <Grid container justify="center" alignItems="center" direction="row" spacing={5}>
      {allProduct.filter(
        (product) => filterProduct(product),
      ).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default Products;
