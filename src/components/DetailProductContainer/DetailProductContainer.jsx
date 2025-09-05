import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import Amount from "../Amount/Amount.jsx";
import useCalcAmount from "../../hooks/useCalcAmount.jsx";
import api from "../../api/api.js";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/slices/cartSlice/cartSlice.js";

const DetailProductContainer = () => {
	const dispatch = useDispatch();
	const { category, productId, productName } = useParams();

	const { handleDecrease, handleIncrease, counter } = useCalcAmount();
	const { categoriesList } = useGetCategories();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		async function loadProduct() {
			if (categoriesList.length > 0 && category && productId) {
				const selectedCategory = categoriesList.find(item =>
					item.name.toLowerCase().replace(/\s+/g, '-') === category
				);
				if (selectedCategory) {
					try {
						const products = await api.products.getProductsList(selectedCategory.id);
						const foundProduct = products.find(p => p.id === parseInt(productId));
						if (foundProduct) {
							const normalized = {
								id: foundProduct.id,
								title: foundProduct.name,
								price: parseFloat(foundProduct.price),
								image: `data:image/png;base64,${foundProduct.image}`,
								category: foundProduct.categoryName,
								discount: foundProduct.discount,
								description: foundProduct.description || 'No description available'
							};
							setProduct(normalized);
						}
					} catch (e) {
						console.error('Ошибка при загрузке продукта:', e);
					}
				}
			}
		}
		loadProduct();
	}, [category, productId, categoriesList]);

	if (!product) {
		return (
			<section className="section_01">
				<h2>Product Not Found</h2>
				<p>The product you are looking for does not exist.</p>
			</section>
		);
	}

	const handleAddToCart = () => {
		dispatch(addProductToCart({ product, counter }));
	};

	// Функция для расчета цены со скидкой
	const calculatePrice = (price, discount) => {
		if (discount === 0) return parseFloat(price).toFixed(2);
		const discountedPrice = price * (1 - discount / 100);
		return parseFloat(discountedPrice).toFixed(2);
	};

	// Функция для форматирования оригинальной цены
	const formatOriginalPrice = (price) => parseFloat(price).toFixed(2);

	return (
		<section className="section_catalog">
			<div className="section_catalog__container_product">
				<div className="container_top">
					<div className="foto">
						<img
							src={product.image}
							alt={product.title}
						/>
					</div>
					<div className="description">
						<h4>{product.title}</h4>
						<p>{product.description}</p>
					</div>
				</div>
				<div className="container_bottom">
					<div className="amount">
						<h3>Amount:</h3>
						<Amount handleDecrease={handleDecrease} handleIncrease={handleIncrease} counter={counter} />
					</div>
					<div className="price">
						<h3>Price:</h3>
						<span className="extra">
							{calculatePrice(product.price, product.discount)} ₪
						</span>
					</div>
					<button
						className="section_01__promotions-item-button button"
						data-cart
						onClick={handleAddToCart}
					>
						add to cart
					</button>
				</div>
			</div>
		</section>
	);
};

export default DetailProductContainer;