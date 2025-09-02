import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../../api/api.js";

export const fetchProductsByCategory = createAsyncThunk(
	"products/fetchByCategory",
	async (catId) => {
		const res = await api.products.getProductsList(catId);
		return res;
	}
);

export const fetchProductsSpecials = createAsyncThunk(
	"products/fetchSpecials",
	async () => {
		try {
		const res = await api.products.getAllProductsSpecials();
		console.log('API response:', res);
		return res;
		} catch (e) {
			console.error('Thunk error:', e);
			throw e;  // Добавьте throw для rejected
		}
	}
);


const productsSlice = createSlice({
	name: "products",
	initialState: {
		items: [],
		specialItems: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProductsByCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchProductsByCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(fetchProductsSpecials.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductsSpecials.fulfilled, (state, action) => {
				state.loading = false;
				state.specialItems = action.payload;
			})
			.addCase(fetchProductsSpecials.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default productsSlice.reducer;
