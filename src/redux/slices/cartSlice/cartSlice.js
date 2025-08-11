import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
	name: "cart",
	initialState: JSON.parse(localStorage.getItem("cart"))||[],
	reducers: {

		addProductToCart: (state, action) => {
			const {counter, product} = action.payload;
			const newList = state.filter((p) => p.id !== product.id);
			const newCartList = [...newList, { ...product, number: counter }];
			localStorage.setItem("cart", JSON.stringify(newCartList))
			return newCartList;
		},
		removeFromCart: (state, action) => {
			const productId = action.payload;
			const newCartList = state.filter((p) => p.id !== productId);
			localStorage.setItem("cart", JSON.stringify(newCartList));
			return newCartList;
		},
		resetCart: (state, action) => {
			localStorage.removeItem("cart");
			return [];
		}

	},
});

export const { addProductToCart, removeFromCart, resetCart} =
	cartSlice.actions;
export default cartSlice.reducer;
