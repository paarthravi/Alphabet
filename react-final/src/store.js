import { configureStore, createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Veg: [
            { name: 'Tomato', price: 200.8 },
            { name: 'Potato', price: 18.0 },
            { name: 'Carrot', price: 45.50 },
            { name: 'Radish', price: 30.0 }
        ],
        NonVeg: [
            { name: 'Chicken', price: 600.90 },
            { name: 'Mutton', price: 1100 },
            { name: 'Eggs', price: 450 },
            { name: 'Fish', price: 1000.08 }
        ]
    },
    reducers: {}
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const item = state.find((item) => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find((item) => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find((item) => item.name === action.payload.name);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Use splice to remove the item in place
                const index = state.findIndex((item) => item.name === action.payload.name);
                if (index !== -1) state.splice(index, 1);
            }
        },
        removeFromCart: (state, action) => {
            // Use splice to remove the item in place
            const index = state.findIndex((item) => item.name === action.payload.name);
            if (index !== -1) state.splice(index, 1);
        }
    }
});

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
    }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default store;
