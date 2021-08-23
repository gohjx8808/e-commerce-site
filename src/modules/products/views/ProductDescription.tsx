import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useParams } from '@reach/router';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageModal, updateSelectedProductImage, updateSelectedProductImageList } from '../src/productReducers';
import productStyle from '../src/productStyle';

interface ProductDescriptionParams{
  id:string
}

const ProductDescription = () => {
  const styles = productStyle();
  const dispatch = useAppDispatch();
  const params:ProductDescriptionParams = useParams();
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const selectedProduct = allProducts.find(
    (product) => product.node.contentful_id === params.id,
  )?.node!;

  const triggerEnlargeImage = (imageData:ImageDataLike, carouselImageList:ImageDataLike[]) => {
    dispatch(updateSelectedProductImage(imageData));
    dispatch(updateSelectedProductImageList(carouselImageList));
    dispatch(toggleEnlargedProductImageModal(true));
  };
  console.log(JSON.parse(selectedProduct.contentDescription.raw));

  return (
    <Grid container alignItems="center" spacing={4} className={styles.productDescriptionBg}>
      <Grid item xs={12}>
        <Typography variant="h4">{selectedProduct.name}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Carousel
          indicators={false}
          autoPlay={false}
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
        <Typography variant="h5">Description</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductDescription;
