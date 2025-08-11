import React from 'react';
import {useDispatch} from "react-redux";
import {
	removeFromCart,
	resetCart
} from "../../redux/slices/cartSlice/cartSlice.js";
import Close from "../../icons/Close/Close.jsx";
import {selectCartItems} from "../../redux/slices/cartSlice/cartSelectors.js";
import {useSelector} from "react-redux";
const closeStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
}

const OrderContainer = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const [deliveryTerms, setDeliveryTerms] = React.useState("Tomorrow from 9am to 12pm");
	const [paymentMethods, setPaymentMethods] = React.useState("By card to the courier");
	const [formData, setFormData] = React.useState({
		userName: "",
		userEmail: "",
		userAdress: "",
		userPhone: "",
		userComment: ""
	});
	console.log("formData: ",  formData);
	console.log("deliveryTerms: ",  deliveryTerms);
	console.log("paymentMethods: ",  paymentMethods);
	const total = cartItems.reduce((sum, item) => sum + item.price * (item.number || 1), 0);
	return (


			<div className="section_01">
				<div className="section_01__header_container">
					{/*<a*/}
					{/*	href="index.html"*/}
					{/*	className="go-back"*/}
					{/*>Go Back</a>*/}
					<h2>Order products</h2>
				</div>

				<div className="section_01__shopping-cart-container">
					<div className="cart-item-container" data-items>
						{cartItems.length === 0 ? (
							<p>Your cart is empty</p>
						) : (
							cartItems.map((product) => (
								<div key={product.id} className="cart-item-container">
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
											// onClick={() => removeFromCart(product.id)}
											onClick={() =>	dispatch(removeFromCart(product.id))}
										>
											<Close {...closeStyle} />
										</button>

									</div>

								</div>

							))
						)}
					</div>
					<div className="total_order_price">
						<h3>Total price:</h3>
						<p><span data-order-price>{total.toFixed(2)}</span> ₪</p>
					</div>
					<div className="order_delivery">
						<h4>order time</h4>
						<div className="radio_group">
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 9am to 12pm"}
									name="radio_1"
									value="Tomorrow from 9am to 12pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}



								/>
								<span className="checkmark">Tomorrow from 9am to 12pm</span>
							</label>
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 1pm to 4pm"}
									name="radio_1"
									value="Tomorrow from 1pm to 4pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
								/>
								<span className="checkmark">Tomorrow from 1pm to 4pm</span>
							</label>
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 5pm to 8pm"}
									name="radio_1"
									value="Tomorrow from 5pm to 8pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}

								/>
								<span className="checkmark">Tomorrow from 5pm to 8pm</span>
							</label>
						</div>

					</div>
					<div className="order_info">


						<form
							id="order_form"
							autoComplete="on"
						>
							<h4>personal information</h4>
							<label htmlFor="name">Name<span className="red">*</span></label>
							<input
								placeholder="your name"
								name="name"
								id="name"
								type="text"
								required
								value={formData.userName}
								onChange={(e) => setFormData({...formData, userName: e.target.value})}
							/>

							<label htmlFor="email">Email<span className="red">*</span></label>
							<input
								placeholder="email"
								name="email"
								id="email"
								type="email"
								required
							/>

							<label htmlFor="adress">Adress<span className="red">*</span></label>
							<input
								placeholder="adress delivery"
								name="adress"
								id="adress"
								type="text"
								required
							/>

							<label htmlFor="phone">Phone<span className="red">*</span></label>
							<input
								placeholder="your phone"
								name="phone"
								id="phone"
								type="tel"
								required
							/>
							<label htmlFor="comment">Comment</label>
							<textarea
								name="comment"
								id="comment"
								placeholder="leave your comment"
							></textarea>
						</form>
					</div>
					<div className="order_payment">
						<h4>payment</h4>
						<div className="order_payment__container">
							<label className="wrapper">By card to the courier
								<input
									type="radio"
									checked = {paymentMethods==="By card to the courier"}
									name="radio_2"
									value="By card to the courier"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
								/>
								<span className="checkmark">&nbsp;</span>
							</label>
							<label className="wrapper">Cash to the courier
								<input
									type="radio"
									checked = {paymentMethods==="Cash to the courier"}
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
									name="radio_2"
									value="Cash to the courier"
								/>
								<span className="checkmark">&nbsp;</span>
							</label>
							<label className="wrapper">VISA, MasterCard
								<input
									type="radio"
									checked = {paymentMethods==="VISA, MasterCard"}
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
									name="radio_2"
									value="VISA, MasterCard"
								/>
								<span className="checkmark">&nbsp;</span>
							</label>
						</div>

					</div>
					<button
						className="total_order_price"
						data-order-send
						onClick={()=>dispatch(resetCart())}
					>
						<h3>Order</h3>
					</button>


				</div>
			</div>

	);
};

export default OrderContainer;
