import "../../../styles/header.scss";
import Logo from "../../../assets/images/Logo.png";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import PhoneIcon from "../../../icons/PhoneIcon/PhoneIcon.jsx";
import ClockIcon from "../../../icons/ClockIcon/ClockIcon.jsx";
import CartIcon from "../../../icons/CartIcon/CartIcon.jsx";
import {
	useLanguage
} from "../../../context/LanguageContext/LanguageContext.jsx";
import {useCart} from "../../../context/CartContext/CartContext.jsx";
import ModalCart from "../../ModalCart/ModalCart.jsx";
import {
	selectCartItems
} from "../../../redux/slices/cartSlice/cartSelectors.js";
import {useSelector} from "react-redux";
import ModalOverlay from "../../ModalOverlay/ModalOverlay.jsx";
import {useIntl} from "react-intl";
import FlagRu from "../../../icons/FlagRu/FlagRu.jsx";
import FlagEn from "../../../icons/FlagEn/FlagEn.jsx";

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

const Header = () => {
	const intl = useIntl();
	const {deleteFromCart} = useCart();
	const cartItems = useSelector(selectCartItems);
	const {locale, setLocale} = useLanguage(); // Используем useLanguage для получения locale и setLocale
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const handleOpenCartModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleOpenOverlay = () => {
		setIsOverlayOpen(!isOverlayOpen);
	};

	const handleCloseModal = () => {
		setIsOverlayOpen(false);
	};

	return (
		<header className="header">
			<div className="header__inner">
				<Link
					to="/"
					className="header__logo logo"
				>
					<img
						className="logo__image"
						src={Logo}
						alt="Mont Blank"
						width="250"
						height="84"
					/>
				</Link>
				<div className="header__menu services">
					<ul>
						<li>
							<button
								className="header__button button"
								onClick={handleOpenOverlay}
							>
								{intl.formatMessage({id: "sign_in"})}
							</button>
							{isOverlayOpen && (
								<ModalOverlay
									isOverlayOpen={isOverlayOpen}
									onCloseOverlay={handleCloseModal}
								/>
							)}
						</li>

							<li
								className={`header__menu-item ${locale === "en" ? "active" : ""}`}
								onClick={() => setLocale("en")}
							>
								 <FlagEn/>
							</li>
							<li
								className={`header__menu-item ${locale === "ru" ? "active" : ""}`}
								onClick={() => setLocale("ru")}
							>
								<FlagRu />
							</li>

					</ul>
				</div>
				<div className="header__contact phone">
					<PhoneIcon {...iconStyle} />
					<div>
						<p className="tel">050 145-28-41</p>
						<p className="time">{intl.formatMessage({id: "support"})} 0800 574 54 44</p>
					</div>
				</div>
				<div className="header__contact time">
					<ClockIcon {...iconStyle} />
					<div>
						<p className="tel">{intl.formatMessage({id: "store_open"})}</p>
						<p className="time">{intl.formatMessage({id: "daily_from"})} 8.00 to 21.00</p>
					</div>
				</div>
				<div className="header__cart_container">
					<div className="header__cart">
						<button
							className="header__button button cart"
							onClick={handleOpenCartModal}
						>
							<CartIcon {...cartStyle} />
							<p>{intl.formatMessage({id: "cart"})}</p>
							<p
								className="amount-items-null"
								data-amount
							>
								{cartItems.length}
							</p>
						</button>
						{isModalOpen && (
							<ModalCart
								cartItems={cartItems}
								deleteFromCart={deleteFromCart}
							/>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;