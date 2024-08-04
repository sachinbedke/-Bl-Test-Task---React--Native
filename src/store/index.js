import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/products';
import cartReducer from '../slices/cartSlice';

const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
