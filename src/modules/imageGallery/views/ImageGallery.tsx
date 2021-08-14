import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import {
  GatsbyImage, getImage, IGatsbyImageData, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedImageModal, updateSelectedImage } from '../src/imageGalleryReducer';
import imageGalleryStyles from '../src/imageGalleryStyles';
import EnlargedImageModal from './EnlargedImageModal';

const ImageGallery = () => {
  const styles = imageGalleryStyles();
  const allProducts = useAppSelector((state) => state.product.allProducts);
  const [allProductImages, setAllProductImages] = useState<ImageDataLike[]>([]);
  const dispatch = useAppDispatch();

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

  const handleImageClick = (image:IGatsbyImageData) => {
    dispatch(updateSelectedImage(image));
    dispatch(toggleEnlargedImageModal(true));
  };

  return (
    <Grid item xs={12}>
      <Box className={styles.imageListRoot}>
        <ImageList rowHeight="auto" cols={5}>
          {allProductImages && allProductImages.map((image) => {
            const productImagesData = getImage(image)!;
            return (
              <ImageListItem
                key={productImagesData.images.fallback?.src}
                className={styles.imageListItem}
              >
                <GatsbyImage
                  onClick={() => handleImageClick(productImagesData)}
                  image={productImagesData}
                  alt={productImagesData.images.fallback?.src!}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <EnlargedImageModal />
    </Grid>
  );
};

export default ImageGallery;
