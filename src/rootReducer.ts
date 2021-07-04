import { combineReducers } from 'redux';
import { authSlice } from './modules/auth/src/authReducer';

export default combineReducers({
  auth: authSlice.reducer,
});
