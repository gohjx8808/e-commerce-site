import { combineReducers } from 'redux';
import { statusSlice } from './modules/status/src/statusReducer';

export default combineReducers({
  status: statusSlice.reducer,
});
