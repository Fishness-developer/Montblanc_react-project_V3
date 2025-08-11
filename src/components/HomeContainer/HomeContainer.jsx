import React, {useEffect, useState, useMemo} from 'react';
import Product from "../Product/Product.jsx";
import api from "../../api/api.js";
import {useDispatch, useSelector} from "react-redux";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import {
	selectProducts, selectSpecials
} from "../../redux/slices/productsSlice/productsSelectors.js";
import {
	fetchProductsByCategory, fetchProductsSpecials
} from "../../redux/slices/productsSlice/productsSlice.js";

const HomeContainer = () => {
	const [specialProducts, setSpecialProducts] = useState([]);
	// const { categoriesList } = useGetCategories();
	const dispatch = useDispatch();
	const productSpecials = useSelector(selectSpecials);
	console.log("productSpecials: ", productSpecials);
	// const filteredProducts = useMemo(() => productSpecials?.filter(product => product.specialOffers === true), [productSpecials])

	const filteredProducts = useMemo(() => productSpecials?.reduce((acc, product) => {
		if (product.specialOffers) {
			const normalizedProduct = {
				id: product.id,
				title: product.name,
				price: parseFloat(product.price),
				image: `data:image/png;base64,${product.image}`,
				category: product.categoryName
			}
			acc.push(normalizedProduct);
		}
		return acc;
	},[]), [productSpecials])

	console.log("filteredProducts: ", filteredProducts);

	// const normalizedProducts = filteredProducts.map(product => ({
	// 	id: product.id,
	// 	title: product.name,
	// 	price: parseFloat(product.price),
	// 	image: `data:image/png;base64,${product.image}`,
	// 	category: product.categoryName
	// }));

	// const fetchSpecialProducts = async () => {
	// 	try {
	// 		let allSpecialProducts = [];
	// 		for (const category of categoriesList) {
	//
	// 			// dispatch(fetchProductsByCategory(category.id));
	//
	// 			// const products = await api.products.getProductsList(category.id);
	// 			const products = await dispatch(fetchProductsByCategory(category.id)).unwrap();
	//
	//
	// 			const filteredProducts = products.filter(product => product.specialOffers === true);
	// 			console.log("filteredProducts: ", filteredProducts);
	// 			const normalizedProducts = filteredProducts.map(product => ({
	// 				id: product.id,
	// 				title: product.name,
	// 				price: parseFloat(product.price),
	// 				image: `data:image/png;base64,${product.image}`,
	// 				category: product.categoryName
	// 			}));
	// 			allSpecialProducts = [...allSpecialProducts, ...normalizedProducts];
	// 		}
	// 		setSpecialProducts(allSpecialProducts);
	// 	} catch (e) {
	// 		console.error('Ошибка при получении специальных предложений:', e);
	// 		setSpecialProducts([]);
	// 	}
	// };

	useEffect(() => {
		if (productSpecials?.length === 0) {
			dispatch(fetchProductsSpecials());
		}
	}, [productSpecials?.length]);

	return (
		<div>
			<section className="section_01">
				<h2>Special Offers</h2>
				<ul className="section_01__promotions">
					{filteredProducts.length === 0 ? (
						<p>Нет специальных предложений или ошибка загрузки.</p>
					) : (
						filteredProducts.map((item) => (
							<Product
								key={item.id}
								product={item}
							/>
						))
					)}
				</ul>
			</section>
		</div>
	);
};

export default HomeContainer;