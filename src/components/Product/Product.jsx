// import React from 'react';
// import {useNavigate} from "react-router-dom";
//
// const Product = ({product, showDiscount = false}) => { // Добавляем prop showDiscount
// 	const navigate = useNavigate();
//
// 	const formatTitleForUrl = (title) => {
// 		return title
// 			.toLowerCase()
// 			.replace(/[,]/g, '')
// 			.replace(/[^a-z0-9]+/g, '-')
// 			.replace(/-+/g, '-')
// 			.replace(/^-|-$/g, '');
// 	};
//
// 	// Вычисляем цену со скидкой
// 	const discountedPrice = product.discount
// 		? (product.price * (1 - product.discount / 100)).toFixed(2)
// 		: null;
//
// 	return (
// 		<li
// 			className="section_01__promotions-item"
// 			data-product-name={product.title}
// 		>
// 			<div className="item-image">
// 				<img
// 					src={product.image}
// 					width="137"
// 					height="156"
// 					alt={product.title}
// 				/>
// 			</div>
// 			<p className="price">
// 				{showDiscount && product.discount ? (
// 					<>
// 						<p>
// 							<span className="extra">{discountedPrice}</span> ₪
// 						</p>
// 						<p className="offer">
// 							{parseFloat(product.price).toFixed(2)}₪
// 							<span className="percent">-{product.discount}%</span>
// 						</p>
// 					</>
// 				) : (
// 					<p>
// 						<span className="extra">{parseFloat(product.price).toFixed(2)}</span> ₪
// 					</p>
// 				)}
// 			</p>
// 			<p className="item-description">{product.title}</p>
//
// 			<button
// 				className="section_01__promotions-item-button button"
// 				data-cart
// 				onClick={() => navigate(`/catalog/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.id}`)}
// 			>
// 				view product
// 			</button>
// 		</li>
// 	);
// };
//
//
// export default Product;

//

// import React, { useMemo } from 'react';
// import { useNavigate } from "react-router-dom";
//
// // Утилита для форматирования строк в URL-friendly формат
// const formatForUrl = (str) =>
// 	str
// 		.toLowerCase()
// 		.replace(/[,]/g, '')
// 		.replace(/[^a-z0-9]+/g, '-')
// 		.replace(/-+/g, '-')
// 		.replace(/^-|-$/g, '');
//
// // Утилита для форматирования цены
// const formatPrice = (price) => parseFloat(price).toFixed(2);
//
// const Product = ({ product, showDiscount = false }) => {
// 	const navigate = useNavigate();
//
// 	// Мемоизация вычисляемых значений
// 	const { formattedUrl, discountedPrice, formattedPrice } = useMemo(() => ({
// 		formattedUrl: `/catalog/${formatForUrl(product.category)}/${product.id}`,
// 		discountedPrice: product.discount
// 			? formatPrice(product.price * (1 - product.discount / 100))
// 			: null,
// 		formattedPrice: formatPrice(product.price),
// 	}), [product]);
//
// 	return (
// 		<li className="section_01__promotions-item">
// 			<div className="item-image">
// 				<img
// 					src={product.image}
// 					width="137"
// 					height="156"
// 					alt={product.title}
// 					loading="lazy"
// 				/>
// 			</div>
// 			<p className="price">
// 		 		{showDiscount && product.discount ? (
// 					<>
// 						<p>
// 							<span className="extra">{discountedPrice}</span> ₪
// 						</p>
// 						<p className="offer">
// 							{parseFloat(product.price).toFixed(2)}₪
// 							<span className="percent">-{product.discount}%</span>
// 						</p>
// 					</>
// 				) : (
// 					<p>
// 						<span className="extra">{parseFloat(product.price).toFixed(2)}</span> ₪
// 					</p>
// 				)}
// 			</p>
// 			<p className="item-description">{product.title}</p>
// 			<button
// 				type="button"
// 				className="section_01__promotions-item-button button"
// 				onClick={() => navigate(formattedUrl)}
// 			>
// 				View Product
// 			</button>
// 		</li>
// 	);
// };
//
// export default Product;

import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { formatForUrl, formatPrice } from "../../utils/format.js";

const Product = ({ product, showDiscount = false }) => {
	const navigate = useNavigate();

	const { formattedUrl, discountedPrice, formattedPrice } = useMemo(() => ({
		formattedUrl: `/catalog/${formatForUrl(product.category)}/${product.id}`,
		discountedPrice: product.discount
			? formatPrice(product.price * (1 - product.discount / 100))
			: null,
		formattedPrice: formatPrice(product.price),
	}), [product]);

	return (
		<li className="section_01__promotions-item">
			<div className="item-image">
				<img
					src={product.image}
					width="137"
					height="156"
					alt={product.title}
					loading="lazy"
				/>
			</div>
			<p className="price">
 				{showDiscount && product.discount ? (
					<>
						<p>
							<span className="extra">{discountedPrice}</span> ₪
						</p>
						<p className="offer">
							{parseFloat(product.price).toFixed(2)}₪
							<span className="percent">-{product.discount}%</span>
						</p>
					</>
				) : (
					<p>
						<span className="extra">{parseFloat(product.price).toFixed(2)}</span> ₪
					</p>
				)}
			</p>
			<p className="item-description">{product.title}</p>
			<button
				type="button"
				className="section_01__promotions-item-button button"
				aria-label={`View details for ${product.title}`}
				onClick={() => navigate(formattedUrl)}
			>
				View Product
			</button>
		</li>
	);
};

export default Product;
