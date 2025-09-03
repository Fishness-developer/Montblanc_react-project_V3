import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import Product from "../Product/Product.jsx";
import api from "../../api/api.js";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";

const CategoryContainer = () => {
	const {category} = useParams();
	const [productsByCategories, setProductsByCategories] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const { categoriesList } = useGetCategories();

	useEffect(() => {
		if (categoriesList.length > 0 && category) {
			const selectedCategory = categoriesList.find(item =>
				item.name.toLowerCase().replace(/\s+/g, '-') === category
			);
			if (selectedCategory) {
				setCategoryName(selectedCategory.name);
				fetchProducts(selectedCategory.id);
			} else {
				setCategoryName('Category Not Found');
				setProductsByCategories([]);
			}
		}
	}, [category, categoriesList]);

	const fetchProducts = async (catId) => {
		try {
			const products = await api.products.getProductsList(catId);
			const normalizedProducts = products.map(product => ({
				id: product.id,
				title: product.name,
				price: parseFloat(product.price),
				image: `data:image/png;base64,${product.image}`,
				category: product.categoryName
			}));
			setProductsByCategories(Array.isArray(normalizedProducts) ? normalizedProducts : []);
		} catch (e) {
			console.error('Ошибка при получении продуктов:', e);
			setProductsByCategories([]);
		}
	};

	return (
		<div className="section_catalog__container">
			<div className="left_sidebar">
				<h3>Catalog</h3>
				<LeftSidebar />
			</div>
			<div className="right_sidebar">
				<h2>{categoryName}</h2>
				<ul className="section_01__promotions">
					{productsByCategories.length === 0 ? (
						<p>Category is empty</p> // Сообщение при пустом списке
					) : (
						productsByCategories.map((item) => (
							<Product
								key={item.id}
								product={item}
							/>
						))
					)}
				</ul>
			</div>
		</div>
	);
};

export default CategoryContainer;