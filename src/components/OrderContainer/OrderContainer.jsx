import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromCart,
	resetCart
} from "../../redux/slices/cartSlice/cartSlice.js";
import Close from "../../icons/Close/Close.jsx";
import {selectCartItems} from "../../redux/slices/cartSlice/cartSelectors.js";

import api from "../../api/api.js";
import { useIntl } from "react-intl";


const closeStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
}


const OrderContainer = () => {
	const intl = useIntl();
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
	const [isSending, setIsSending] = React.useState(false);
	const [successMessage, setSuccessMessage] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");
	const [formErrors, setFormErrors] = React.useState({});
	const total = cartItems.reduce((sum, item) => sum + item.price * (item.number || 1), 0);




	const validateForm = () => {
		const errors = {};
		if (!formData.userName.trim()) errors.userName = intl.formatMessage({ id: "inputName"});
		if (!formData.userEmail.trim()) errors.userEmail = intl.formatMessage({ id: "inputEmail"});
		else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) errors.userEmail = intl.formatMessage({ id: "invalidEmail"});
		if (!formData.userAdress.trim()) errors.userAdress = intl.formatMessage({ id: "inputAddress"});
		if (!formData.userPhone.trim()) errors.userPhone =intl.formatMessage({ id: "inputPhone"});
		else if (formData.userPhone.length < 9) errors.userPhone = intl.formatMessage({ id: "shortPhone"});
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleOrderSubmit = async () => {
		if (!validateForm()) return;

		setIsSending(true);
		setSuccessMessage("");
		setErrorMessage("");

		const orderData = {
			name: formData.userName,
			email: formData.userEmail,
			address: formData.userAdress,
			phone: formData.userPhone,
			comment: formData.userComment,
			delivery: deliveryTerms,
			payment: paymentMethods,
			total: total.toFixed(2),
			products: cartItems.map(item => ({
				image: item.image,
				name: item.title,
				price: item.price,
				value: item.number || 1
			}))
		};

		try {
			const response = await api.cart.postOrder(orderData);  // Используем новый метод postOrder
			console.log('Server response:', response);  // Вывод ответа с сервера в консоль при успехе

			setSuccessMessage("Order sent successfully!");
			dispatch(resetCart());
			localStorage.removeItem('products');  // Очистка localStorage, если используется

			setTimeout(() => {
				window.location.href = '/';  // Редирект на главную
			}, 3000);
		} catch (e) {
			console.error('Order error:', e);
			setErrorMessage("Error sending order. Please try again.");
		} finally {
			setIsSending(false);
		}
	};

	return (


			<div className="section_01">
				<div className="section_01__header_container">
					<h2>{intl.formatMessage({ id: "orderProducts" })}</h2>
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
						<h3>{intl.formatMessage({ id: "totalPrice" })}:</h3>
						<p><span data-order-price>{total.toFixed(2)}</span> ₪</p>
					</div>
					<div className="order_delivery">
						<h4>{intl.formatMessage({ id: "orderTime" })}</h4>
						<div className="radio_group">
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 9am to 12pm"}
									name="radio_1"
									value="Tomorrow from 9am to 12pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}



								/>
								<span className="checkmark">{intl.formatMessage({ id: "tomorrowFrom" })} 9am to 12pm</span>
							</label>
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 1pm to 4pm"}
									name="radio_1"
									value="Tomorrow from 1pm to 4pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
								/>
								<span className="checkmark">{intl.formatMessage({ id: "tomorrowFrom" })} 1pm to 4pm</span>
							</label>
							<label className="container">
								<input
									type="radio"
									checked = {deliveryTerms==="Tomorrow from 5pm to 8pm"}
									name="radio_1"
									value="Tomorrow from 5pm to 8pm"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}

								/>
								<span className="checkmark">{intl.formatMessage({ id: "tomorrowFrom" })} 5pm to 8pm</span>
							</label>
						</div>

					</div>
					<div className="order_info">


						<form
							id="order_form"
							autoComplete="on"
						>
							<h4>{intl.formatMessage({ id: "personalInformation" })}</h4>
							<label htmlFor="name">{intl.formatMessage({ id: "name" })}<span className="red">*</span></label>
							<input
								placeholder={intl.formatMessage({ id: "yourName" })}
								name="name"
								id="name"
								type="text"
								required
								value={formData.userName}
								onChange={(e) => setFormData({...formData, userName: e.target.value})}

							/>
							{formErrors.userName && <p className="error">{formErrors.userName}</p>}

							<label htmlFor="email">Email<span className="red">*</span></label>
							<input
								placeholder="email"
								name="email"
								id="email"
								type="email"
								value={formData.userEmail}
								onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
								required
							/>
							{formErrors.userEmail && <p className="error">{formErrors.userEmail}</p>}

							<label htmlFor="adress">{intl.formatMessage({ id: "adress" })}<span className="red">*</span></label>
							<input
								placeholder={intl.formatMessage({ id: "adressDelivery" })}
								name="adress"
								id="adress"
								type="text"
								value={formData.userAdress}
								onChange={(e) => setFormData({...formData, userAdress: e.target.value})}
								required
							/>
							{formErrors.userAdress && <p className="error">{formErrors.userAdress}</p>}

							<label htmlFor="phone">{intl.formatMessage({ id: "phone" })}<span className="red">*</span></label>
							<input
								placeholder={intl.formatMessage({ id: "yourPhone" })}
								name="phone"
								id="phone"
								type="tel"
								value={formData.userPhone}
								onChange={(e) => setFormData({...formData, userPhone: e.target.value})}
								required
							/>
							{formErrors.userPhone && <p className="error">{formErrors.userPhone}</p>}

							<label htmlFor="comment">{intl.formatMessage({ id: "comment" })}</label>
							<textarea
								name="comment"
								id="comment"
								placeholder={intl.formatMessage({ id: "leaveComment" })}
								value={formData.userComment}
								onChange={(e) => setFormData({...formData, userComment: e.target.value})}
							></textarea>
						</form>
					</div>
					<div className="order_payment">
						<h4>{intl.formatMessage({ id: "payment" })}</h4>
						<div className="order_payment__container">
							<label className="wrapper">{intl.formatMessage({ id: "cardToCourier" })}
								<input
									type="radio"
									checked = {paymentMethods==="By card to the courier"}
									name="radio_2"
									value="By card to the courier"
									onChange={(e) =>  setDeliveryTerms(e.target.value)}
								/>
								<span className="checkmark">&nbsp;</span>
							</label>
							<label className="wrapper">{intl.formatMessage({ id: "cashToCourier" })}
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
						// onClick={()=>dispatch(resetCart())}
						onClick={handleOrderSubmit}
						disabled={isSending || cartItems.length === 0}
					>
						{/*<h3>Order</h3>*/}
						<h3>
							{isSending
								? intl.formatMessage({ id: "sending", defaultMessage: "Sending..." })
								: intl.formatMessage({ id: "order", defaultMessage: "Order" })}
						</h3>
					</button>

					{successMessage && <p className="status">{successMessage}</p>}
					{errorMessage && <p className="status">{errorMessage}</p>}

				</div>
			</div>

	);
};

export default OrderContainer;
