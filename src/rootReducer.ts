import { combineReducers } from 'redux';
import { overlaySlice } from './modules/overlay/src/overlayReducer';
import { statusSlice } from './modules/status/src/statusReducer';
import { authSlice } from './modules/auth/src/authReducer';
import { productSlice } from './modules/products/src/productReducers';
import { accountSlice } from './modules/account/src/accountReducer';
import { imageGallerySlice } from './modules/imageGallery/src/imageGalleryReducer';
import { feedbackSlice } from './modules/feedback/src/feedbackReducer';

export default combineReducers({
  auth: authSlice.reducer,
  status: statusSlice.reducer,
  overlay: overlaySlice.reducer,
  product: productSlice.reducer,
  account: accountSlice.reducer,
  imageGallery: imageGallerySlice.reducer,
  feedback: feedbackSlice.reducer,
});
