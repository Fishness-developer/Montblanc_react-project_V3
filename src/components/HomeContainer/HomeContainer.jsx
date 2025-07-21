import React, { useEffect, useState } from 'react';
import Product from "../Product/Product.jsx";
import api from "../../api/api.js";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";

const HomeContainer = () => {
	const [specialProducts, setSpecialProducts] = useState([]);
	const { categoriesList } = useGetCategories();

	const fetchSpecialProducts = async () => {
		try {
			let allSpecialProducts = [];
			for (const category of categoriesList) {
				const products = await api.products.getProductsList(category.id);
				const filteredProducts = products.filter(product => product.specialOffers === true);
				const normalizedProducts = filteredProducts.map(product => ({
					id: product.id,
					title: product.name,
					price: parseFloat(product.price),
					image: `data:image/png;base64,${product.image}`,
					category: product.categoryName
				}));
				allSpecialProducts = [...allSpecialProducts, ...normalizedProducts];
			}
			setSpecialProducts(allSpecialProducts);
		} catch (e) {
			console.error('Ошибка при получении специальных предложений:', e);
			setSpecialProducts([]);
		}
	};

	useEffect(() => {
		if (categoriesList.length > 0) {
			fetchSpecialProducts();
		}
	}, [categoriesList]);

	return (
		<div>
			<section className="section_01">
				<h2>Special Offers</h2>
				<ul className="section_01__promotions">
					{specialProducts.length === 0 ? (
						<p>Нет специальных предложений или ошибка загрузки.</p>
					) : (
						specialProducts.map((item) => (
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