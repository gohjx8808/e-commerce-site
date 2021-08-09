import Dialog from '@material-ui/core/Dialog';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageModal } from '../src/productReducers';

const EnlargedProductImageModal = () => {
  const dispatch = useAppDispatch();
  const selectedProductImage = useAppSelector((state) => state.product.selectedProductImage);
  const isEnlargedProductImageBackdropOpen = useAppSelector(
    (state) => state.product.isEnlargedProductImageModalOpen,
  );

  return (
    <Dialog
      open={isEnlargedProductImageBackdropOpen}
      onClose={() => dispatch(toggleEnlargedProductImageModal(false))}
    >
      <GatsbyImage
        image={selectedProductImage!}
        alt={selectedProductImage?.images.fallback?.src!}
      />
    </Dialog>
  );
};

export default EnlargedProductImageModal;
