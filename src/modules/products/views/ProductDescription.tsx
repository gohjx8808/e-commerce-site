import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Add, AddShoppingCart, Remove } from '@material-ui/icons';
import { useParams } from '@reach/router';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageModal, updateSelectedProductImage, updateSelectedProductImageList } from '../src/productReducers';
import productStyle from '../src/productStyle';

interface ProductDescriptionParams{
  id:string
}

interface jsonContentDescriptionData{
  content:contentData[]
}

interface contentData{
  content:innerContentData[]
}

interface innerContentData{
  value:string
}

const ProductDescription = () => {
  const styles = productStyle();
  const dispatch = useAppDispatch();
  const params:ProductDescriptionParams = useParams();
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const selectedProduct = allProducts.find(
    (product) => product.node.contentful_id === params.id,
  )?.node!;
  const [itemQuantity, setItemQuantity] = useState(1);

  const triggerEnlargeImage = (imageData:ImageDataLike, carouselImageList:ImageDataLike[]) => {
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
  };

  const jsonContentDescription:jsonContentDescriptionData = JSON.parse(
    selectedProduct.contentDescription.raw,
  );

  const increaseItemQuantity = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const reduceItemQuantity = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleItemQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = parseInt(event.target.value, 10);
    if (inputQuantity > 0) {
      setItemQuantity(inputQuantity);
    } else {
      setItemQuantity(1);
    }
  };

  return (
    <Grid container spacing={4} className={styles.productDescriptionBg}>
      <Grid item xs={12}>
        <Typography variant="h4">{selectedProduct.name}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Carousel
          autoPlay
          indicators={false}
          navButtonsProps={{
            className: styles.productCardCarouselNavButton,
            style: {},
          }}
        >
          {selectedProduct.productImage.map((image) => {
            const imageData = getImage(image)!;
            return (
              <Box
                className={styles.carouselImageContainer}
                key={imageData.images.fallback?.src}
                onClick={() => triggerEnlargeImage(image, selectedProduct.productImage)}
              >
                <GatsbyImage
                  image={imageData}
                  alt={selectedProduct.name}
                />
              </Box>
            );
          })}
        </Carousel>
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h5" className={styles.boldText}>Description</Typography>
            {jsonContentDescription.content.map((description) => (
              <Typography variant="h6" key={description.content[0].value}>
                {description.content[0].value}
              </Typography>
            ))}
          </Grid>
          <Grid item>
            <Grid container justifyContent="center">
              <IconButton className={styles.minusIconButton} onClick={reduceItemQuantity}>
                <Remove />
              </IconButton>
              <Grid item xs={1}>
                <FormControl hiddenLabel variant="filled" className={styles.quantityInput} size="small">
                  <FilledInput
                    disableUnderline
                    inputProps={{ className: styles.centerText }}
                    value={itemQuantity}
                    onChange={handleItemQuantityChange}
                  />
                </FormControl>
              </Grid>
              <IconButton className={styles.plusIconButton} onClick={increaseItemQuantity} size="medium">
                <Add />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                endIcon={<AddShoppingCart />}
                size="large"
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDescription;
