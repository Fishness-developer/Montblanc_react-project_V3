// src/components/Layout/Layout.jsx
import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext/CartContext';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import Header from './Header/Header.jsx';
import NavBar from './NavBar/NavBar.jsx';
import { Outlet } from 'react-router-dom';
import CartContainer from '../CartContainer/CartContainer.jsx';
import Advertising from './Advertising/Advertising.jsx';
import Information from './Information/Information.jsx';
import Support from './Support/Support.jsx';
import Footer from './Footer/Footer.jsx';

const Layout = () => {
	// const { isCart, setIsCart } = useCart(); // Используем хук useCart
	const { language, changeLanguage, translate } = useLanguage(); // Получаем функции для локализации

	// Логи для отладки (можно удалить в продакшене)



	return (
		<div>
			{/* Переключатель языка */}
			<div className="language-switcher">
				<button onClick={() => changeLanguage('en')}>{translate('English')}</button>
				<button onClick={() => changeLanguage('he')}>{translate('Hebrew')}</button>
			</div>

			<Header />
			<NavBar />
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