import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';

import rootReducer from 'redux/slice/userSlice';
import shopSlice from 'redux/slice/shop/shopSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedShopReducer = persistReducer(persistConfig, shopSlice);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    shop: persistedShopReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
