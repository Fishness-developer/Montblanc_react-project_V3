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
		const res = await api.products.getAllProductsSpecialls();
		return res;
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
