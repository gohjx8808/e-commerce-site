import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface imageGalleryState{
  isEnlargedImageModalOpen:boolean
  selectedImage:IGatsbyImageData
}

const INITIAL_STATE:imageGalleryState = {
  isEnlargedImageModalOpen: false,
  selectedImage: {
    layout: 'fixed',
    width: 0,
    height: 0,
    images: {},
  },
};

export const imageGallerySlice = createSlice({
  name: 'imageGallery',
  initialState: INITIAL_STATE,
  reducers: {
    toggleEnlargedImageModal: (state, action:PayloadAction<boolean>) => {
      state.isEnlargedImageModalOpen = action.payload;
    },
    updateSelectedImage: (state, action:PayloadAction<IGatsbyImageData>) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { toggleEnlargedImageModal, updateSelectedImage } = imageGallerySlice.actions;

export default imageGallerySlice.reducer;
