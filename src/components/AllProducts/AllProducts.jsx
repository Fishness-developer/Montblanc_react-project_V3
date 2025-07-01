import React from 'react';
import allProducts from "../../data/package_products.json";
import Product from "../Product/Product.jsx";
import {useCart} from "../../context/CartContext/CartContext.jsx";

const AllProducts = () => {
	const { products } = useCart();
	return (

			<ul className="section_01__promotions">
				{products.map((item) => (
					<Product
						key={item.id}
						product={item}
					/>
				))}
			</ul>

	);
};

export default AllProducts;
