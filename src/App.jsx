import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./styles/styles.scss";
import {LanguageProvider} from "./context/LanguageContext/LanguageContext.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import SpecialOffers from "./pages/SpecialOffers.jsx";
import Delivery from "./pages/Delivery.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Contacts from "./pages/Contacts.jsx";
import CartProvider from "./context/CartContext/CartContext.jsx";



const App = () => {
	return (
 <CartProvider>
	 <LanguageProvider>
		 <BrowserRouter>
			 <Routes>
				 <Route
					 path="/"
					 element={<Layout />}
				 >
					 <Route
						 index
						 element={<Home />}
					 />
					 <Route
						 path="/catalog"
						 element={<Catalog />}
					 />
					 <Route
						 path="/special-offers"
						 element={<SpecialOffers />}
					 />
					 <Route
						 path="/delivery"
						 element={<Delivery />}
					 />
					 <Route
						 path="/contacts"
						 element={<Contacts />}
					 />
					 <Route
						 path="/sign-in"
						 element={<SignIn />}
					 />
					 <Route
						 path="/sign-up"
						 element={<SignUp />}
					 />
				 </Route>
			 </Routes>
		 </BrowserRouter>
	 </LanguageProvider>
 </CartProvider>


			)};


			export default App;
