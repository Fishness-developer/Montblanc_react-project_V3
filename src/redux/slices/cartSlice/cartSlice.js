// import { createSlice } from "@reduxjs/toolkit";
//
//
// const cartSlice = createSlice({
// 	name: "cart",
// 	initialState: JSON.parse(localStorage.getItem("cart"))||[],
// 	reducers: {
//
// 		addProductToCart: (state, action) => {
// 			const {counter, product} = action.payload;
// 			const newList = state.filter((p) => p.id !== product.id);
// 			const newCartList = [...newList, { ...product, number: counter }];
// 			localStorage.setItem("cart", JSON.stringify(newCartList))
// 			return newCartList;
// 		},
// 		removeFromCart: (state, action) => {
// 			const productId = action.payload;
// 			const newCartList = state.filter((p) => p.id !== productId);
// 			localStorage.setItem("cart", JSON.stringify(newCartList));
// 			return newCartList;
// 		},
// 		resetCart: (state, action) => {
// 			localStorage.removeItem("cart");
// 			return [];
// 		}
//
// 	},
// });
//
// export const { addProductToCart, removeFromCart, resetCart} =
// 	cartSlice.actions;
// export default cartSlice.reducer;

// Modified cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: JSON.parse(localStorage.getItem("cart")) || [],
		isCartOpen: false
	},
	reducers: {
		addProductToCart: (state, action) => {
			const {counter, product} = action.payload;
			const newList = state.items.filter((p) => p.id !== product.id);
			state.items = [...newList, { ...product, number: counter }];
			localStorage.setItem("cart", JSON.stringify(state.items));
		},
		removeFromCart: (state, action) => {
			const productId = action.payload;
			state.items = state.items.filter((p) => p.id !== productId);
			localStorage.setItem("cart", JSON.stringify(state.items));
		},
		resetCart: (state, action) => {
			localStorage.removeItem("cart");
			state.items = [];
			state.isCartOpen = false;
		},
		openCartModal: (state) => {
			state.isCartOpen = true;
		},
		toggleCartModal: (state) => {
			state.isCartOpen = !state.isCartOpen;
		},
		closeCartModal: (state) => {
			state.isCartOpen = false;
		}
	},
});

export const { addProductToCart, removeFromCart, resetCart, openCartModal, toggleCartModal, closeCartModal } =
	cartSlice.actions;
export default cartSlice.reducer;