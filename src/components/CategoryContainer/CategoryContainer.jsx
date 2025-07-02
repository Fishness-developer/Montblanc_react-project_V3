import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext.jsx';
import Product from "../Product/Product.jsx";

const CategoryContainer = () => {
	const { category } = useParams(); // Извлекаем категорию из URL
	const { products, addToCart } = useCart(); // Получаем товары и функцию addToCart из контекста

	// Фильтруем товары по категории (сравнение без учета регистра)
	const filteredProducts = products.filter(
		(product) => product.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
	);

	return (
		<div className="catalog__products">
			<h2>product categories</h2>
			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
					<Product
						key={product.id}
						product={product}
					/>
				))
			) : (
				<p>Товары в этой категории отсутствуют.</p>
			)}
		</div>
	);
};

export default CategoryContainer;