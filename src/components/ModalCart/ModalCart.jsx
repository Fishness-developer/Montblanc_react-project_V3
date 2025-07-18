import React from 'react';


const ModalCart = ({cartItems, addToCart, deleteFromCart}) => {
	return (
		<div class="modal_cart">
			{cartItems.map(product => {
				return (
					<div>
						<div key={product.id}>{product.title}</div>
						<button onClick={() => deleteFromCart(product.id)}>X</button>
					</div>

				)
			})}
		</div>
	);
};

export default ModalCart;
