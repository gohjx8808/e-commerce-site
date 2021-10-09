import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {
  GatsbyImage, getImage, IGatsbyImageData, ImageDataLike,
} from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedImageModal, updateSelectedImage } from '../src/imageGalleryReducer';
import EnlargedImageModal from './EnlargedImageModal';

const ImageGallery = () => {
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
      <Box paddingTop={1}>
        <ImageList rowHeight="auto" cols={5}>
          {allProductImages && allProductImages.map((image, index) => {
            const productImagesData = getImage(image)!;
            return (
              <ImageListItem
                // eslint-disable-next-line react/no-array-index-key
                key={productImagesData.images.fallback?.src! + index}
                sx={{ cursor: 'zoom-in' }}
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
