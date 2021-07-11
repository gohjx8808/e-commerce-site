import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import { Close, KeyboardArrowUp } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import ProductCard from './ProductCard';
import productStyle from '../src/productStyle';
import ScrollTop from '../../../sharedComponents/ScrollTop';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleCartSnackbar } from '../src/productReducers';

type TransitionProps = Omit<SlideProps, 'direction'>;

const Products = () => {
  const styles = productStyle();
  const dispatch = useAppDispatch();
  const isCartSnackbarOpen = useAppSelector((state) => state.product.isCartSnackbarOpen);
  console.log(isCartSnackbarOpen);
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

  const toggleSnackbar = (_event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(toggleCartSnackbar(false));
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
              {allProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              <ScrollTop>
                <Fab color="secondary" size="medium" aria-label="scroll back to top">
                  <KeyboardArrowUp />
                </Fab>
              </ScrollTop>
            </Grid>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={isCartSnackbarOpen}
              autoHideDuration={3000}
              onClose={toggleSnackbar}
              message="Product added"
              action={(
                <IconButton size="small" aria-label="close" color="inherit" onClick={toggleSnackbar}>
                  <Close fontSize="small" />
                </IconButton>
              )}
              className={styles.mobileSnackbar}
              TransitionComponent={(props:TransitionProps) => <Slide {...props} direction="left" />}
              ContentProps={{ className: styles.snackbarContent }}
            />
          </>
        );
      }}
    />
  );
};

export default Products;
