// src/components/Layout/Layout.jsx
import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import Header from './Header/Header.jsx';
import NavBar from './NavBar/NavBar.jsx';
import { useLocation, Outlet } from 'react-router-dom';
import CartContainer from '../CartContainer/CartContainer.jsx';
import Advertising from './Advertising/Advertising.jsx';
import Information from './Information/Information.jsx';
import Support from './Support/Support.jsx';
import Footer from './Footer/Footer.jsx';
import SliderVanila from "../SliderVanilla/SliderVanila.jsx";
import SliderVanilla from "./SliderVanilla/SliderVanila.jsx";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs.jsx";




const Layout = () => {
	// const { isCart, setIsCart } = useCart(); // Используем хук useCart
	const { language, changeLanguage, translate } = useLanguage(); // Получаем функции для локализации
	const location = useLocation();

	// Проверяем, является ли текущий маршрут главной страницей
	const isHomePage = location.pathname === '/';




	return (
		<div>
			{/* Переключатель языка */}
			<div className="language-switcher">
				<button onClick={() => changeLanguage('en')}>{translate('English')}</button>
				<button onClick={() => changeLanguage('he')}>{translate('Hebrew')}</button>
			</div>

			<Header />
			<NavBar />
			{isHomePage && <SliderVanilla />}
			{!isHomePage && <BreadCrumbs /> }

			<main>

				<Outlet />
				{/*{isCart ? <CartContainer /> : <Outlet />}*/}
			</main>
			<Advertising />
			<Information />
			<Support />
			<Footer />
		</div>
	);
};

export default Layout;