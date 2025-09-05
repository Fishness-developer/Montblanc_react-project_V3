// src/components/Layout/Layout.jsx
import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import Header from './Header/Header.jsx';
import NavBar from './NavBar/NavBar.jsx';
import { useLocation, Outlet } from 'react-router-dom';
import Advertising from './Advertising/Advertising.jsx';
import Information from './Information/Information.jsx';
import Support from './Support/Support.jsx';
import Footer from './Footer/Footer.jsx';
import SliderVanilla from "./SliderVanilla/SliderVanila.jsx";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs.jsx";

const Layout = () => {
	const { language, changeLanguage, translate } = useLanguage(); // Получаем функции для локализации
	const location = useLocation();
	// Проверяем, является ли текущий маршрут главной страницей
	const isHomePage = location.pathname === '/';

	return (
		<div>
			<Header />
			<NavBar />
			{isHomePage && <SliderVanilla />}
			{!isHomePage && <BreadCrumbs /> }
			<main>
				<Outlet />
			</main>
			<Advertising />
			<Information />
			<Support />
			<Footer />
		</div>
	);
};

export default Layout;