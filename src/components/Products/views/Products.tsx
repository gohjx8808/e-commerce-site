import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ProductCard from './ProductCard';

const Products = () => {
  const allPriceQuery = graphql`
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
              description
              id
              images
              name
              type
            }
            active
            currency
            id
          }
        }
      }
    }`;

  return (
    <StaticQuery
      query={allPriceQuery}
      render={({ prices }) => {
        const allProduct:products.productData[] = [];
        const extractedPrices:products.queryProductData[] = prices.edges;
        extractedPrices.forEach((price) => {
          const realPrice = price.node;
          const extractedProduct = realPrice.product;
          const { product, ...otherDetail } = realPrice;
          extractedProduct!.prices = otherDetail;
          allProduct.push(extractedProduct!);
        });
        return (
          <div>
            {allProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        );
      }}
    />
  );
};

export default Products;
