import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../../data/package_products.json'; // Импортируем JSON

const CartContext = createContext();

const CartProvider = ({ children }) => {
	// Используем данные из JSON как начальное состояние
	const [products, setProducts] = useState(productsData);
	const [cart, setCart] = useState([]);

	const addToCart = (product) => {
		setCart([...cart, product]);
	};

	// Выводим содержимое корзины в консоль при каждом её изменении
	useEffect(() => {
		console.log('Текущая корзина:', cart);
	}, [cart]);

	return (
		<CartContext.Provider value={{ products, cart, addToCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
export default CartProvider;