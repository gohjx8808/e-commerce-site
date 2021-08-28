import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './utils/localStorageUtils';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistedState = loadState();

const config = {
  blacklist: ['auth/submitSignIn', 'status/toggleStatusModal', 'auth/getCurrentUserDetailsAction'],
};

export function initializeStore(initialState = persistedState) {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware),
    );
    return store;
  }
  const middlewares = [sagaMiddleware, createStateSyncMiddleware(config)];
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );
  initMessageListener(store);
  return store;
}

const store = initializeStore();

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

sagaMiddleware.run(rootSaga);

export type RootState=ReturnType<typeof store.getState>

export type AppDispatch=typeof store.dispatch

export default store;
