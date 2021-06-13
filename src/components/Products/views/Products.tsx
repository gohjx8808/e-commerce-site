import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import ProductCard from './ProductCard';

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
};

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
            {Object.keys(allProduct).map((key) => (
              <ProductCard key={allProduct[key].id} product={allProduct[key]} />
            ))}
          </div>
        );
      }}
    />
  );
};

export default Products;
