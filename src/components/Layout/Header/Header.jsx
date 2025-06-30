import "../../../styles/header.scss";
import Logo from "../../../assets/images/Logo.png";
import {Link} from "react-router-dom";
import React, {useContext} from "react";
import PhoneIcon from "../../../icons/PhoneIcon/PhoneIcon.jsx";
import ClockIcon from "../../../icons/ClockIcon/ClockIcon.jsx";
import CartIcon from "../../../icons/CartIcon/CartIcon.jsx";
import LanguageContext
	from "../../../context/LanguageContext/LanguageContext.jsx";


const iconStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
};
const cartStyle = {
	width: "20px",
	height: "18px",
	fill: "#ffffff",
};

const Header = ({IsCart, setIsCart}) => {
	const {setLocale} = useContext(LanguageContext);
	console.log('CartContext values:', { IsCart, setIsCart });
	return (
		<header className="header">
			<div className="header__inner">
				<Link
					to={`/`}
					className="header__logo logo"
				>
					{" "}
					<img
						className="logo__image"
						src={Logo}
						alt="Mont Blank"
						width="250"
						height="84"
					/>{" "}
				</Link>
				<div className="header__menu services">
					<ul>
						<Link
							to={`/sign-up`} className="header__menu-item">
							Sign Up
						</Link>
						<Link
							to={`/sign-in`} className="header__menu-item">
							Sign In
						</Link>
						<li></li>
						<li
							className="header__menu-item"
							onClick={() => setLocale("en")}
						>
							En
						</li>
						<li
							className="header__menu-item"
							onClick={() => setLocale("ru")}
						>
							Ru
						</li>
					</ul>
				</div>
				<div className="header__contact phone">
					<PhoneIcon {...iconStyle} />
					<div>
						<p className="tel">050 145-28-41</p>
						<p className="time">support 0800 574 54 44</p>
					</div>
				</div>
				<div className="header__contact time">
					<ClockIcon {...iconStyle} />
					<div>
						<p className="tel">Store Opening</p>
						<p className="time">daily from 8.00 to 21.00</p>
					</div>
				</div>
				<div className="header__cart_container">
					<div className="header__cart">
						<button className="header__button button cart" onClick={() => setIsCart(!IsCart)}>
							<CartIcon {...cartStyle} />
							<p>cart</p>
							<p
								className="amount-items-null"
								data-amount
							>
								0
							</p>
						</button>
					</div>
					<div className="header__drop-cart-container" >
						<div className="header__drop-cart">
							<div className="drop-cart-inner" >
								<p className="cart_header">Your order:</p>
								<p className="cart-amount">
									<span className="cart-amount-total">&nbsp;</span> ₪
								</p>
							</div>
							<div
								className="cart-item-container"
								data-items
							></div>
							<a
								href="cart.html"
								className="header__drop-cart-button hide"
								data-cart-total
							>
								{" "}
								Order
							</a>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
