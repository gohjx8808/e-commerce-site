import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { KeyboardArrowUp } from '@material-ui/icons';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import ScrollTop from '../../../sharedComponents/ScrollTop';
import productStyle from '../src/productStyle';
import ProductCard from './ProductCard';

const Products = () => {
  const styles = productStyle();
  const productFilterKeyword = useAppSelector((state) => state.product.productFilterKeyword);
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
    }`;

  const filterProduct = (product:products.productData) => {
    if (productFilterKeyword) {
      return product.name.includes(productFilterKeyword);
    }
    return true;
  };

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
          <>
            <Grid container justify="center" alignItems="center" direction="row" spacing={5} className={styles.rootContainer}>
              {allProduct.filter(
                (product) => filterProduct(product),
              ).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              <ScrollTop>
                <Fab color="secondary" size="medium" aria-label="scroll back to top">
                  <KeyboardArrowUp />
                </Fab>
              </ScrollTop>
            </Grid>
          </>
        );
      }}
    />
  );
};

export default Products;
