// // import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// // import api from "../../../api/api.js";
// //
// // export const fetchProductsByCategory = createAsyncThunk(
// // 	"products/fetchByCategory",
// // 	async (catId) => {
// // 		const res = await api.products.getProductsList(catId);
// // 		return res;
// // 	}
// // );
// //
// // export const fetchProductsSpecials = createAsyncThunk(
// // 	"products/fetchSpecials",
// // 	async () => {
// // 		try {
// // 		const res = await api.products.getAllProductsSpecials();
// // 		console.log('API response:', res);
// // 		return res;
// // 		} catch (e) {
// // 			console.error('Thunk error:', e);
// // 			throw e;  // Добавьте throw для rejected
// // 		}
// // 	}
// // );
// //
// //
// // const productsSlice = createSlice({
// // 	name: "products",
// // 	initialState: {
// // 		items: [],
// // 		specialItems: [],
// // 		loading: false,
// // 		error: null,
// // 	},
// // 	reducers: {},
// // 	extraReducers: (builder) => {
// // 		builder
// // 			.addCase(fetchProductsByCategory.pending, (state) => {
// // 				state.loading = true;
// // 				state.error = null;
// // 			})
// // 			.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
// // 				state.loading = false;
// // 				state.items = action.payload;
// // 			})
// // 			.addCase(fetchProductsByCategory.rejected, (state, action) => {
// // 				state.loading = false;
// // 				state.error = action.error.message;
// // 			})
// // 			.addCase(fetchProductsSpecials.pending, (state) => {
// // 				state.loading = true;
// // 				state.error = null;
// // 			})
// // 			.addCase(fetchProductsSpecials.fulfilled, (state, action) => {
// // 				state.loading = false;
// // 				state.specialItems = action.payload;
// // 			})
// // 			.addCase(fetchProductsSpecials.rejected, (state, action) => {
// // 				state.loading = false;
// // 				state.error = action.error.message;
// // 			});
// // 	},
// // });
// //
// // export default productsSlice.reducer;
//
//
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../api/api.js";
//
// export const fetchProductsByCategory = createAsyncThunk(
// 	"products/fetchByCategory",
// 	async (catId, { getState }) => {
// 		const state = getState();
// 		// Проверяем, есть ли уже данные в кэше
// 		if (state.products.byCategory[catId]?.status === "succeeded") {
// 			return { catId, products: state.products.byCategory[catId].products };
// 		}
// 		const res = await api.products.getProductsList(catId);
// 		return { catId, products: res };
// 	}
// );
//
// export const fetchProductsSpecials = createAsyncThunk(
// 	"products/fetchSpecials",
// 	async () => {
// 		const res = await api.products.getAllProductsSpecials();
// 		return res;
// 	}
// );
//
// const productsSlice = createSlice({
// 	name: "products",
// 	initialState: {
// 		byCategory: {}, // { [catId]: { products: [], status: 'idle' | 'loading' | 'succeeded' | 'failed', error: null } }
// 		specialItems: [],
// 		loading: false, // Глобальный loading для обратной совместимости
// 		error: null, // Глобальный error для обратной совместимости
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchProductsByCategory.pending, (state, action) => {
// 				const catId = action.meta.arg;
// 				state.byCategory[catId] = {
// 					...state.byCategory[catId],
// 					status: "loading",
// 					error: null,
// 				};
// 				state.loading = true; // Для обратной совместимости
// 			})
// 			.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
// 				const { catId, products } = action.payload;
// 				// Нормализация данных
// 				const normalizedProducts = products.map((product) => ({
// 					id: product.id,
// 					title: product.name,
// 					price: parseFloat(product.price),
// 					image: `data:image/png;base64,${product.image}`,
// 					category: product.categoryName,
// 				}));
// 				state.byCategory[catId] = {
// 					products: normalizedProducts,
// 					status: "succeeded",
// 					error: null,
// 				};
// 				state.loading = false;
// 				state.items = normalizedProducts; // Для обратной совместимости
// 			})
// 			.addCase(fetchProductsByCategory.rejected, (state, action) => {
// 				const catId = action.meta.arg;
// 				state.byCategory[catId] = {
// 					...state.byCategory[catId],
// 					status: "failed",
// 					error: action.error.message,
// 				};
// 				state.loading = false;
// 				state.error = action.error.message; // Для обратной совместимости
// 			})
// 			.addCase(fetchProductsSpecials.pending, (state) => {
// 				state.loading = true;
// 				state.error = null;
// 			})
// 			.addCase(fetchProductsSpecials.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.specialItems = action.payload;
// 			})
// 			.addCase(fetchProductsSpecials.rejected, (state, action) => {
// 				state.loading = false;
// 				state.error = action.error.message;
// 			});
// 	},
// });
//
// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api.js";

const normalizeProduct = (product) => ({
	id: product.id,
	title: product.name,
	price: parseFloat(product.price),
	discount: product.discount || null,
	image: `data:image/png;base64,${product.image}`,
	category: product.categoryName,
	specialOffers: product.specialOffers || false, // Учитываем specialOffers
});

export const fetchProductsByCategory = createAsyncThunk(
	"products/fetchByCategory",
	async (catId, { getState }) => {
		const state = getState();
		if (state.products.byCategory[catId]?.status === "succeeded") {
			return { catId, products: state.products.byCategory[catId].products };
		}
		const res = await api.products.getProductsList(catId);
		return { catId, products: res };
	}
);

export const fetchProductsSpecials = createAsyncThunk(
	"products/fetchSpecials",
	async (_, { getState }) => {
		const state = getState();
		if (state.products.specialItems.length && state.products.specialStatus === "succeeded") {
			return state.products.specialItems;
		}
		const res = await api.products.getAllProductsSpecials();
		return res;
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		byCategory: {},
		specialItems: [],
		specialStatus: "idle",
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsByCategory.pending, (state, action) => {
				const catId = action.meta.arg;
				state.byCategory[catId] = {
					...state.byCategory[catId],
					status: "loading",
					error: null,
				};
				state.loading = true;
			})
			.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
				const { catId, products } = action.payload;
				state.byCategory[catId] = {
					products: products.map(normalizeProduct),
					status: "succeeded",
					error: null,
				};
				state.loading = false;
				state.items = products.map(normalizeProduct);
			})
			.addCase(fetchProductsByCategory.rejected, (state, action) => {
				const catId = action.meta.arg;
				state.byCategory[catId] = {
					...state.byCategory[catId],
					status: "failed",
					error: action.error.message,
				};
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchProductsSpecials.pending, (state) => {
				state.specialStatus = "loading";
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductsSpecials.fulfilled, (state, action) => {
				state.specialStatus = "succeeded";
				state.loading = false;
				state.specialItems = action.payload.map(normalizeProduct);
			})
			.addCase(fetchProductsSpecials.rejected, (state, action) => {
				state.specialStatus = "failed";
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default productsSlice.reducer;