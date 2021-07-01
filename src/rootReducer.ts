import { combineReducers } from 'redux';
import { authSlice } from './modules/Authentication/src/authReducer';

export default combineReducers({
  auth: authSlice.reducer,
});
