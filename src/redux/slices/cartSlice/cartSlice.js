import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {

		addProductToCart: (state, action) => {
			const {counter, product} = action.payload;
			const newList = state.filter((p) => p.id !== product.id);
			return [...newList, { ...product, number: counter }];
		},
		removeFromCart: (state, action) => {
			const productId = action.payload;
			return state.filter((p) => p.id !== productId);
		}

	},
});

export const { addProductToCart, removeFromCart} =
	cartSlice.actions;
export default cartSlice.reducer;
