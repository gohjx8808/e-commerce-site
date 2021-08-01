import Grid from '@material-ui/core/Grid';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import ProductCard from './ProductCard';

const Products = () => {
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
  const allProducts:products.rawProductQueryData = useStaticQuery(graphql`
    query ProductPrices {
      allContentfulProducts(filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            name
            contentful_id
            category
            productImage {
              gatsbyImageData
            }
            price
            contentDescription {
              raw
            }
          }
        }
      }
    }`);

  const filterProduct = (product:products.innerProductQueryData) => {
    if (productFilterKeyword) {
      return product.node.name.toLowerCase().includes(productFilterKeyword.toLowerCase());
    }
    return true;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" direction="row" spacing={5}>
      {allProducts.allContentfulProducts.edges.filter(
        (product) => filterProduct(product),
      ).map((product) => (
        <ProductCard key={product.node.contentful_id} product={product.node} />
      ))}
    </Grid>
  );
};

export default Products;
