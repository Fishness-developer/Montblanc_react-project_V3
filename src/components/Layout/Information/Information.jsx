import React from 'react';
import DeliveryIcon from "../../../icons/DeliveryIcon/DeliveryIcon.jsx";
import Support from "../../../icons/Support/Support.jsx";
import Payment from "../../../icons/Payment/Payment.jsx";
import {useIntl} from "react-intl";
import "../../../styles/section_03.scss"
const fillStyle = {
	width: "70px",
	height: "70px",
	fill:"#46BB22"
}
const Information = () => {
	const intl = useIntl();
	return (
		<section className="section_03">
			<h2>{intl.formatMessage({ id: "deliveryAndPayment" })}</h2>
			<div className="section_03__info">
				<div className="delivery">
					<DeliveryIcon {...fillStyle} />
					<h3>Delivery</h3>
					<p className="sub_text">DAILY FROM 06:00 TO 12:00</p>
					<p>Choose any convenient 2-hour interval. Healthy food delivery in
						Moscow is carried out by our drivers,
						who pick up your order from the kitchen in the morning and deliver
						it at the time and place you
						specify.
					</p>
				</div>
				<div className="support">
		<Support {...fillStyle}/>
					<h3>Support</h3>
					<p className="sub_text">24/7 and 7 days a week</p>
					<p>If you have any questions or difficulties with the receipt,
						delivery or quality of the goods, our
						support service will help you solve your problem at any time. We
						work 24 hours a day and 7 days a
						week.
					</p>
				</div>
				<div className="payment">
					<Payment {...fillStyle}/>
					<h3>Payment</h3>
					<p className="sub_text">by any convenient method</p>
					<p>We do everything so that you can pay for the goods in the most
						convenient way. Currently, you can pay
						in the following ways: payment by cards, cash to the courier upon
						receipt of the goods and through
						an online wallet.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Information;
