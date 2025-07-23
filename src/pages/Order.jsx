import React from 'react';
import CatalogContainer
	from "../components/CatalogContainer/CatalogContainer.jsx";
import OrderContainer from "../components/OrderContainer/OrderContainer.jsx";

const Order = () => {
	return (
		<section className="section_catalog">
			<OrderContainer />
		</section>
	);
};

export default Order;
