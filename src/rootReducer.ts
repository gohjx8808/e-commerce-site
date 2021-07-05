import { combineReducers } from 'redux';
import { statusSlice } from './modules/status/src/statusReducer';
import { authSlice } from './modules/auth/src/authReducer';

export default combineReducers({
  auth: authSlice.reducer,
  status: statusSlice.reducer,
});
