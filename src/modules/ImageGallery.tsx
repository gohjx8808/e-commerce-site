import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppSelector } from '../hooks';

const useStyle = makeStyles({
  imageListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingTop: 10,
  },
});

const ImageGallery = () => {
  const styles = useStyle();
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const [allProductImages, setAllProductImages] = useState<ImageDataLike[]>([]);

  useEffect(() => {
    const tempProductImages:ImageDataLike[] = [];
    allProducts.map((product) => {
      product.node.productImage.map((image) => {
        tempProductImages.push(image);
        return null;
      });
      return null;
    });
    tempProductImages.sort(() => Math.random() - 0.5);
    setAllProductImages(tempProductImages);
  }, [allProducts]);

  return (
    <Grid item xs={12}>
      <Box className={styles.imageListRoot}>
        <ImageList rowHeight="auto" cols={5}>
          {allProductImages.map((image) => {
            const productImagesData = getImage(image)!;
            return (
              <ImageListItem
                key={productImagesData.images.fallback?.src}
              >
                <GatsbyImage
                  image={productImagesData}
                  alt={productImagesData.images.fallback?.src!}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </Grid>
  );
};

export default ImageGallery;
