import React from 'react';
import Logo from "../../../assets/images/Logo.png";
import Payment from "../../../assets/images/payment.png";
const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<div><img
					src={Logo}
					width="250"
					height="84"
					alt=""
				/>
					<p className="tel">050 145-28-41</p>
					<p className="time">daily from 8.00 to 21.00</p>
				</div>
				<div>
					<h5>For buyers</h5>
					<ul>
						<li className="header__menu-item"><a href="/">Brand </a></li>
						<li className="header__menu-item"><a href="/">Recipes </a></li>
						<li className="header__menu-item"><a href="/">How to order</a></li>
						<li className="header__menu-item"><a href="/">Return of goods </a>
						</li>
						<li className="header__menu-item"><a href="/">Loyalty program</a>
						</li>
					</ul>
				</div>
				<div>
					<h5>information</h5>
					<ul>
						<li className="header__menu-item"><a href="/">Delivery and
							payment </a></li>
						<li className="header__menu-item"><a href="/">Contacts and
							details</a></li>
						<li className="header__menu-item"><a href="/">Privacy policy</a>
						</li>
						<li className="header__menu-item"><a href="/">Consent to data
							processing </a></li>
					</ul>
				</div>
				<div>
					<h5>We accept payment</h5>
					<img
						src={Payment}
						width="170"
						alt="payment"
					/></div>
			</div>
		</footer>
	);
};

export default Footer;
