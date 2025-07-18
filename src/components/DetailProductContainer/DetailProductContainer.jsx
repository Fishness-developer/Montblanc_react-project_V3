import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useCart} from '../../context/CartContext/CartContext';
import Amount from "../Amount/Amount.jsx";
import useCalcAmount from "../../hooks/useCalcAmount.jsx";

const DetailProductContainer = ({product}) => {
	const {id} = useParams(); // Извлекаем id из URL
	const {addToCart} = useCart(); // Получаем продукты и функцию addToCart из контекста
	const [productsAmount, setProductsAmount] = useState(1);
	const {handleDecrease,handleIncrease, counter} = useCalcAmount();
	// Находим продукт по id
	// const product = products.find((p) => p.id === parseInt(id));

	// Если продукт не найден, отображаем сообщение
	if (!product) {
		return (
			<section className="section_01">
				<h2>Product Not Found</h2>
				<p>The product you are looking for does not exist.</p>
			</section>
		);
	}

	// Обработчик для добавления товара в корзину
	const handleAddToCart = () => {
		addToCart(counter,product);

	};

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
						<Amount handleDecrease={handleDecrease} handleIncrease={handleIncrease} counter={counter}  />
					</div>
					<div className="price">
						<h3>Price:</h3>
						<span className="extra">{product.price.toFixed(2)}</span> ₪
					</div>
					<button
						className="section_01__promotions-item-button button"
						data-cart
						onClick={handleAddToCart} // Добавляем обработчик
					>
						add to cart
					</button>
				</div>
			</div>
		</section>
	);
};

export default DetailProductContainer;