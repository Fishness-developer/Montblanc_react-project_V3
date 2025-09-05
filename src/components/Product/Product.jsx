import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { formatForUrl, formatPrice } from "../../utils/format.js";
import {useIntl} from "react-intl";

const Product = ({ product, showDiscount = false }) => {
	const navigate = useNavigate();
	const intl = useIntl();
	const { formattedUrl, discountedPrice, formattedPrice } = useMemo(() => ({
		formattedUrl: `/catalog/${formatForUrl(product.category)}/${product.id}/${formatForUrl(product.title)}`,
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
				{intl.formatMessage({id: "viewProduct"})}
			</button>
		</li>
	);
};

export default Product;