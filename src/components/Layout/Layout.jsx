import React, {useEffect} from 'react';
import Header from "./Header/Header.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import {Outlet} from "react-router-dom";
import CartContainer from "../CartContainer/CartContainer.jsx";
import {CartContext} from '../../context/CartContext/CartContext.jsx'; // Импортируем контекст
import {useContext} from 'react';
import Advertising from "./Advertising/Advertising.jsx";
import Information from "./Information/Information.jsx";
import Support from "./Support/Support.jsx";
import Footer from "./Footer/Footer.jsx";
import SliderVanila from "./SliderVanilla/SliderVanila.jsx";

const Layout = () => {
	const {IsCart, setIsCart} = useContext(CartContext); // Используем контекст

	console.log('CartContext:', {IsCart, setIsCart});

	return (
		<div>
			<Header
				IsCart={IsCart}
				setIsCart={setIsCart}
			/>
			<NavBar />
			{/*<SliderVanila/>*/}
			<main>
				{IsCart ? <CartContainer /> : <Outlet />}
			</main>
			<Advertising/>
			<Information/>
			<Support/>
			<Footer/>
		</div>
	);
};

export default Layout;