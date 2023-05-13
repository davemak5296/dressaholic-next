import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import categoriesReducer from './category/categories.reducer';
import cartReducer from './cart/cart.reducer';
import rootSaga from './root-saga';
import userReducer from './user/user.reducer';

const sagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  user: userReducer,
});

// const persistConfig = {
//   key: 'root',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware, process.env.NODE_ENV !== 'production' ? logger : <any>[]),
  devTools: process.env.NODE_ENV !== 'production',
});

// export const persistor = persistStore(store);
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
