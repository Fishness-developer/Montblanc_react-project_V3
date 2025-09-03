// export const selectProducts = (state) => state.products.items;
// export const selectProductsLoading = (state) => state.products.loading;
// export const selectProductsError = (state) => state.products.error;
// export const selectSpecials = (state) => state.products.specialItems;
//
//
//



// export const selectProducts = (state) => state.products.items; // Для обратной совместимости
// export const selectProductsLoading = (state) => state.products.loading;
// export const selectProductsError = (state) => state.products.error;
// export const selectSpecials = (state) => state.products.specialItems;
//
// export const selectProductsByCategory = (state, catId) =>
// 	state.products.byCategory[catId]?.products || [];
// export const selectIsLoadingByCategory = (state, catId) =>
// 	state.products.byCategory[catId]?.status === "loading";
// export const selectErrorByCategory = (state, catId) =>
// 	state.products.byCategory[catId]?.error;

export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSpecials = (state) => state.products.specialItems;
export const selectSpecialsStatus = (state) => state.products.specialStatus;

export const selectProductsByCategory = (state, catId) =>
	state.products.byCategory[catId]?.products || [];
export const selectIsLoadingByCategory = (state, catId) =>
	state.products.byCategory[catId]?.status === "loading";
export const selectErrorByCategory = (state, catId) =>
	state.products.byCategory[catId]?.error;