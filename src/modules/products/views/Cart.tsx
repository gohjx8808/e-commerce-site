import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import productStyle from '../src/productStyle';

const Cart = () => {
  const styles = productStyle();
  const cartTitle = ['Item', 'Price (RM)', 'Quantity', 'Total (RM)'];
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={2}>
                <Checkbox
                  color="primary"
                  indeterminate={false}
                  inputProps={{ 'aria-label': 'checkAll' }}
                />
              </Grid>
              {cartTitle.map((title) => (
                <Grid item xs={title === 'Item' ? 4 : 2}>
                  <Typography className={styles.cartTitle}>{title}</Typography>
                </Grid>
              ))}
            </Grid>
            {cartItems.map((cartItem) => (
              <Grid container justify="center" alignItems="center" key={cartItem.id} className={styles.cartItemCard}>
                <Grid item xs={2}>
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'checkAll' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>{cartItem.name}</Typography>
                  {cartItem.imgURL.map((localFile) => {
                    const imageData = getImage(localFile)!;
                    return (
                      <Box
                        className={styles.cartItemImageContainer}
                        key={imageData.images.fallback?.src}
                      >
                        <GatsbyImage
                          image={imageData}
                          alt={cartItem.id}
                          imgClassName={styles.cartItemImage}
                        />
                      </Box>
                    );
                  })}
                </Grid>
                <Grid item xs={2}>
                  <Typography>{cartItem.price}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{cartItem.quantity}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    {(+cartItem.price * cartItem.quantity).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
