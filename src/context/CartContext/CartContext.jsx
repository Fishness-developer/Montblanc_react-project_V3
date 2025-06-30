import React from 'react';
import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	const [IsCart, setIsCart] = useState(false);

	return (
		<CartContext.Provider value={{ IsCart, setIsCart }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
