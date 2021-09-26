import Dialog from '@mui/material/Dialog';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedImageModal } from '../src/imageGalleryReducer';

const EnlargedImageModal = () => {
  const dispatch = useAppDispatch();
  const selectedProductImage = useAppSelector((state) => state.imageGallery.selectedImage);
  const isEnlargedImageModalOpen = useAppSelector(
    (state) => state.imageGallery.isEnlargedImageModalOpen,
  );

  return (
    <Dialog
      open={isEnlargedImageModalOpen}
      onClose={() => dispatch(toggleEnlargedImageModal(false))}
    >
      <GatsbyImage
        image={selectedProductImage}
        alt=""
      />
    </Dialog>
  );
};

export default EnlargedImageModal;
