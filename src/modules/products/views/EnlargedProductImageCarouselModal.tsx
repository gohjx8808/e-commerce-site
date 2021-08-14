import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageModal } from '../src/productReducers';

const EnlargedProductImageCarouselModal = () => {
  const dispatch = useAppDispatch();
  const selectedProductImage = useAppSelector((state) => state.product.selectedProductImage);
  const selectedProductImageList = useAppSelector(
    (state) => state.product.selectedProductImageList,
  );
  const isEnlargedProductImageBackdropOpen = useAppSelector(
    (state) => state.product.isEnlargedProductImageModalOpen,
  );

  return (
    <Dialog
      open={isEnlargedProductImageBackdropOpen}
      onClose={() => dispatch(toggleEnlargedProductImageModal(false))}
    >
      <Carousel
        indicators={false}
        autoPlay={false}
        index={selectedProductImageList && selectedProductImageList.findIndex(
          (image) => image === selectedProductImage,
        )}
      >
        {selectedProductImageList && selectedProductImageList.map((image) => {
          const imageData = getImage(image)!;
          return (
            <Box
              key={imageData.images.fallback?.src}
            >
              <GatsbyImage
                image={imageData}
                alt={imageData.images.fallback?.src!}
              />
            </Box>
          );
        })}
      </Carousel>
    </Dialog>
  );
};

export default EnlargedProductImageCarouselModal;
