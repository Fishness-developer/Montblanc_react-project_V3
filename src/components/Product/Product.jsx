import React from 'react';
import DetailProductContainer
	from "../DetailProductContainer/DetailProductContainer.jsx";
import {useNavigate} from "react-router-dom";

const Product = ({product}) => {
	const navigate = useNavigate();
	const formatTitleForUrl = (title) => {
		return title
			.toLowerCase()
			.replace(/[,]/g, '') // Удаляем запятые
			.replace(/[^a-z0-9]+/g, '-') // Заменяем все неалфавитно-цифровые символы на дефис
			.replace(/-+/g, '-') // Удаляем множественные дефисы
			.replace(/^-|-$/g, ''); // Удаляем дефисы в начале и конце
	};
	return (
		<li
			className="section_01__promotions-item"
			data-product-name={product.title}
		>
			<div className="item-image">
				<img
					src={product.image}
					width="137"
					height="156"
					alt={product.title}
				/>
			</div>
			<p className="price">
				<span className="extra">{product.price.toFixed(2)}</span> ₪
			</p>
			{/*<p className="offer">58.00₪<span className="percent">-23%</span></p>*/}
			<p className="item-description">{product.title}</p>

			<button
				// to={`/catalog/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.id}`}
				className="section_01__promotions-item-button button"
				data-cart
				onClick={() => navigate(`/${formatTitleForUrl(product.title)}/${product.id}`)}
			>
 					view product
 			</button>

		</li>
	);
};

export default Product;
