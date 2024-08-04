import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        empltyCart: (state, action) => {
            state.items = [];
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addToCart, removeFromCart, empltyCart } = cartSlice.actions;

export default cartSlice.reducer;
