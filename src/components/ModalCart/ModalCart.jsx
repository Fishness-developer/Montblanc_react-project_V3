import React from 'react';

const ModalCart = ({ cartItems, addToCart, deleteFromCart }) => {
	const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

	return (
		<div className="header__drop-cart">
			<div className="drop-cart-inner">
				<p className="cart_header">Your order:</p>
				<p className="cart-amount">
					<span className="cart-amount-total">{total.toFixed(2)}</span> ₪
				</p>
			</div>
			<div className="cart-item-container" data-items>
				{cartItems.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					cartItems.map((product) => (
						<div className="cart-item-container">
							<div class="cart-order-product" key={product.id}>
								<p>
									{product.title}</p>
									<button onClick={() => deleteFromCart(product.id)}>X</button>

							</div>

						</div>

					))
				)}
			</div>
			<button
				className={`header__drop-cart-button ${cartItems.length === 0 ? 'hide' : ''}`}
				data-cart-total
			>
				Order
			</button>
		</div>
	);
};

export default ModalCart;