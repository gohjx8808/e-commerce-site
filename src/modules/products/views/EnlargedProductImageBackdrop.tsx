import Dialog from '@material-ui/core/Dialog';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { toggleEnlargedProductImageBackdrop } from '../src/productReducers';

const EnlargedProductImageBackdrop = () => {
  const dispatch = useAppDispatch();
  const selectedProductImage = useAppSelector((state) => state.product.selectedProductImage);
  const isEnlargedProductImageBackdropOpen = useAppSelector(
    (state) => state.product.isEnlargedProductImageBackdropOpen,
  );

  return (
    <Dialog
      open={isEnlargedProductImageBackdropOpen}
      onClose={() => dispatch(toggleEnlargedProductImageBackdrop(false))}
    >
      <GatsbyImage
        image={selectedProductImage!}
        alt={selectedProductImage?.images.fallback?.src!}
      />
    </Dialog>
  );
};

export default EnlargedProductImageBackdrop;
