import { combineReducers } from 'redux';
import { overlaySlice } from './modules/overlay/src/overlayReducer';
import { statusSlice } from './modules/status/src/statusReducer';
import { productSlice } from './modules/products/src/productReducers';
import { imageGallerySlice } from './modules/imageGallery/src/imageGalleryReducer';

export default combineReducers({
  status: statusSlice.reducer,
  overlay: overlaySlice.reducer,
  product: productSlice.reducer,
  imageGallery: imageGallerySlice.reducer,
});
