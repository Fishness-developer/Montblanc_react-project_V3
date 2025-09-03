// import React, { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import Product from "../Product/Product.jsx";
// import {
// 	selectSpecials
// } from "../../redux/slices/productsSlice/productsSelectors.js";
// import { fetchProductsSpecials } from "../../redux/slices/productsSlice/productsSlice.js";
//
//
// const normalizeProduct = (product) => ({
// 	id: product.id,
// 	title: product.name,
// 	price: parseFloat(product.price),
// 	discount:product.discount,
// 	image: `data:image/png;base64,${product.image}`,
// 	category: product.categoryName
// });
//
//
//
// const EmptyMessage = () => (
// 	<p>No special offers</p>
// );
//
// const ProductsList = React.memo(({ products }) => (
// 	<>
// 		{products.map((item) => (
// 			<Product
// 				key={item.id}
// 				product={item}
// 				showDiscount={true}
// 			/>
// 		))}
// 	</>
// ));
//
// const HomeContainer = () => {
// 	const dispatch = useDispatch();
// 	const productSpecials = useSelector(selectSpecials);
//
// 	const filteredProducts = useMemo(() =>
// 			productSpecials?.reduce((acc, product) => {
// 				if (product.specialOffers) {
// 					acc.push(normalizeProduct(product));
// 				}
// 				return acc;
// 			}, []) || [],
// 		[productSpecials]);
//
// 	useEffect(() => {
// 		if (!productSpecials?.length) {
// 			dispatch(fetchProductsSpecials());
// 		}
// 	}, [dispatch, productSpecials?.length]);
//
//
// 	return (
// 		<div>
// 			<section className="section_01">
// 				<h2>Special Offers</h2>
// 				<ul className="section_01__promotions">
// 					{!filteredProducts.length ? (
// 						<EmptyMessage />
// 					) : (
// 						<ProductsList products={filteredProducts} />
// 					)}
// 				</ul>
// 			</section>
// 		</div>
// 	);
// };
//
// export default HomeContainer;


import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../ProductList/ProductList.jsx";
import {
	selectSpecials,
	selectSpecialsStatus,
	selectProductsError,
} from "../../redux/slices/productsSlice/productsSelectors.js";
import { fetchProductsSpecials } from "../../redux/slices/productsSlice/productsSlice.js";

const HomeContainer = () => {
	const dispatch = useDispatch();
	const productSpecials = useSelector(selectSpecials);
	const specialStatus = useSelector(selectSpecialsStatus);
	const error = useSelector(selectProductsError);

	const filteredProducts = useMemo(
		() => productSpecials.filter((product) => product.specialOffers).slice(0, 5) || [],
		[productSpecials]
	);

	useEffect(() => {
		if (specialStatus === "idle") {
			dispatch(fetchProductsSpecials());
		}
	}, [dispatch, specialStatus]);

	return (
		<div>

			<section className="section_01 padding-top_50">
				<h2>Special Offers</h2>
				{specialStatus === "loading" ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error: {error}. Try again.</p>
				) : !filteredProducts.length ? (
					<p>No special offers</p>
				) : (
					<ProductList products={filteredProducts} showDiscount={true} />
				)}
			</section>
		</div>
	);
};

export default HomeContainer;