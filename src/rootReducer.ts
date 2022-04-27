import { combineReducers } from 'redux';
import { statusSlice } from './modules/status/src/statusReducer';
import { imageGallerySlice } from './modules/imageGallery/src/imageGalleryReducer';

export default combineReducers({
  status: statusSlice.reducer,
  imageGallery: imageGallerySlice.reducer,
});
