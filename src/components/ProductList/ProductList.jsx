import React from "react";
import Product from "../Product/Product.jsx";

const ProductList = React.memo(({ products, showDiscount }) => (
	<ul className="section_01__promotions">
		{products.map((item) => (
			<Product
				key={item.id}
				product={item}
				showDiscount={showDiscount ? !!item.discount : false}
			/>
		))}
	</ul>
));

export default ProductList;