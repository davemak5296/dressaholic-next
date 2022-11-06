import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import categoriesReducer from './category/categories.reducer';
import cartReducer from './cart/cart.reducer';
import rootSaga from './root-saga';
import userReducer from './user/user.reducer';
// import { BaseState } from '../types';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'user/SIGN_IN_FAILED',
          'user/SIGN_UP_FAILED',
          'user/SIGN_IN_SUCCESS',
          'user/SIGN_UP_SUCCESS',
        ],
        ignoredPaths: ['user.currentUser', 'user.error'],
      },
    }).concat(sagaMiddleware, process.env.NODE_ENV !== 'production' ? logger : <any>[]),
  devTools: process.env.NODE_ENV !== 'production',
});

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  user: userReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
    preloadedState,
  });
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
