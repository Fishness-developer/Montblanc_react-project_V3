import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/styles.scss";
import { LanguageProvider } from "./context/LanguageContext/LanguageContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import SpecialOffers from "./pages/SpecialOffers.jsx";
import Delivery from "./pages/Delivery.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Contacts from "./pages/Contacts.jsx";
import CartProvider from "./context/CartContext/CartContext.jsx";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import Category from "./pages/Category.jsx";
import Order from "./pages/Order.jsx";
import {
	addProductToCart,
	removeFromCart,

} from "./redux/slices/cartSlice/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "./redux/slices/cartSlice/cartSelectors.js";
import {
	selectCategories
} from "./redux/slices/categoriesSlice/categoriesSelectors.js";
import {
	selectProducts
} from "./redux/slices/productsSlice/productsSelectors.js";

const App = () => {
	const products = useSelector(selectProducts);
	const categories = useSelector(selectCategories);
	console.log("categories:", categories);
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();


	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart(id));
	};



	return (
		<CartProvider>
			<LanguageProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="/catalog" element={<Catalog />} />
							<Route path="/catalog/:category" element={<Category />} />
							<Route path="/catalog/:category/:productId" element={<DetailProductPage />} />
							<Route path="/all-offers" element={<SpecialOffers />} />
							<Route path="/delivery" element={<Delivery />} />
							<Route path="/contacts" element={<Contacts />} />
							<Route path="/sign-in" element={<SignIn />} />
							<Route path="/sign-up" element={<SignUp />} />
							<Route path="/order" element={<Order />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</LanguageProvider>
		</CartProvider>
	);
};

export default App;