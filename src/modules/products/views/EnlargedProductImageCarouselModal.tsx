import Dialog from '@mui/material/Dialog';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageModal } from '../src/productReducers';

const EnlargedProductImageCarouselModal = () => {
  const dispatch = useAppDispatch();
  const selectedProductImage = useAppSelector((state) => state.product.selectedProductImage);
  const selectedProductImageList = useAppSelector(
    (state) => state.product.selectedProductImageList,
  );
  const isEnlargedProductImageModalOpen = useAppSelector(
    (state) => state.product.isEnlargedProductImageModalOpen,
  );

  return (
    <Dialog
      open={isEnlargedProductImageModalOpen}
      onClose={() => dispatch(toggleEnlargedProductImageModal(false))}
    >
      <Carousel
        showIndicators={false}
        showStatus={false}
        autoPlay={false}
        showThumbs={false}
        animationHandler="fade"
        selectedItem={selectedProductImageList && selectedProductImageList.findIndex(
          (image) => image === selectedProductImage,
        )}
        infiniteLoop
        transitionTime={800}
      >
        {selectedProductImageList && selectedProductImageList.map((image) => {
          const imageData = getImage(image)!;
          return (
            <GatsbyImage
              key={imageData.images.fallback?.src}
              image={imageData}
              alt={imageData.images.fallback?.src!}
            />
          );
        })}
      </Carousel>
    </Dialog>
  );
};

export default EnlargedProductImageCarouselModal;
