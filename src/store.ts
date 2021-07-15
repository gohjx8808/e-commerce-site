import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './utils/localStorageUtils';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware),
);

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

sagaMiddleware.run(rootSaga);

export type RootState=ReturnType<typeof store.getState>

export type AppDispatch=typeof store.dispatch

export default store;
