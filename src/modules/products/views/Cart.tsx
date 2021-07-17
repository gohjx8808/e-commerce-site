import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import productStyle from '../src/productStyle';

const Cart = () => {
  const styles = productStyle();
  const cartTitle = ['Item', 'Price (RM)', 'Quantity', 'Total (RM)'];
  const cartItems = useAppSelector((state) => state.product.shoppingCartItem);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const onChangeSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'selectAll') {
      if (event.target.checked) {
        const allIds = [] as string[];
        let total = 0;
        cartItems.map((item) => {
          allIds.push(item.id);
          total += +item.price * item.quantity;
          return null;
        });
        setSelectedItems(allIds);
        setTotalAmount(total);
      } else {
        setSelectedItems([]);
        setTotalAmount(0);
      }
    } else {
      let rawTotal = totalAmount;
      if (event.target.checked) {
        setSelectedItems([...selectedItems, event.target.id]);
        setTotalAmount(rawTotal += +event.target!.getAttribute('data-price')!);
      } else {
        const splicedArr = [...selectedItems];
        splicedArr.splice(splicedArr.indexOf(event.target.id), 1);
        setSelectedItems(splicedArr);
        setTotalAmount(rawTotal -= +event.target!.getAttribute('data-price')!);
      }
    }
  };

  return (
    <Grid container justify="center" alignItems="center" className={styles.cartCardContainer} spacing={2}>
      <Grid item xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={2}>
                <Checkbox
                  color="primary"
                  onChange={onChangeSelect}
                  indeterminate={
                    selectedItems.length < cartItems.length && selectedItems.length > 0
                  }
                  checked={selectedItems.length > 0}
                  id="selectAll"
                  inputProps={{ 'aria-label': 'checkAll' }}
                />
              </Grid>
              {cartTitle.map((title) => (
                <Grid item xs={title === 'Item' ? 4 : 2} key={title}>
                  <Typography className={styles.cartTitle}>{title}</Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            {cartItems.map((cartItem, index) => (
              <Grid
                container
                justify="center"
                alignItems="center"
                key={cartItem.id}
                className={`${styles.cartItemCard} ${index === 0 ? '' : styles.topBorderedCartItemCard}`}
              >
                <Grid item xs={2}>
                  <Checkbox
                    checked={selectedItems.includes(cartItem.id)}
                    color="primary"
                    onChange={onChangeSelect}
                    id={cartItem.id}
                    inputProps={{ 'aria-label': 'checkAll', 'data-price': +cartItem.price * cartItem.quantity } as any}
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
      <Grid item xs={11}>
        <Card className={styles.cartCard}>
          <CardContent className={styles.cartTitleCardContent}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={10}>
                <Typography className={styles.cartTitle}>Total</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={styles.cartTitle}>
                  RM
                  {' '}
                  {totalAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Cart;
