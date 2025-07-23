import React from 'react';
import Close from '../../icons/Close/Close.jsx';
import { useNavigate } from 'react-router-dom';
const closeStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
}
const ModalCart = ({ cartItems, addToCart, deleteFromCart }) => {
	// Расчёт общей суммы с учётом product.number
	const navigate = useNavigate();
	const total = cartItems.reduce((sum, item) => sum + item.price * (item.number || 1), 0);


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
							<div className="cart-order-product" key={product.id}>
								<div className="cart-image"><img
									src={product.image}
									width="137"
									height="156"
									alt={product.title}
								/></div>
								<p>
									{product.title}</p>
								<p><span data-price="">{product.price.toFixed(2)}</span> ₪</p>
								<p>{product.number} pcs</p>
								<button
									className="cart-close"
									onClick={() => deleteFromCart(product.id)}
								><Close {...closeStyle} /></button>

							</div>

						</div>

					))
				)}
			</div>
			<button
				className={`header__drop-cart-button ${cartItems.length === 0 ? 'hide' : ''}`}
				data-cart-total
				onClick={() => navigate(`/order`)}
			>
				Order
			</button>
		</div>
	);
};

export default ModalCart;