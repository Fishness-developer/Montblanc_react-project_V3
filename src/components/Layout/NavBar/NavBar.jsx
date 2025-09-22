import "../../../styles/nav.scss"
import {Link, Route} from 'react-router-dom';
import {useIntl} from "react-intl";
import {
	selectCategories
} from "../../../redux/slices/categoriesSlice/categoriesSelectors.js";
import { useSelector } from "react-redux";

const NavBar = () =>{
	const intl = useIntl();
	const categoriesList = useSelector(selectCategories);
	return (
		<nav className="nav">
			<ul className="nav__menu">
				<Link  to={`/catalog/${categoriesList[0]?.name.replace(" ", "-").toLowerCase()}`} className="nav__menu-item"> {intl.formatMessage({ id: "catalog" })} </Link>
				<Link  to={`/all-offers`} className="nav__menu-item">{intl.formatMessage({ id: "allOffers" })}</Link>
				<Link  to={`/delivery`} className="nav__menu-item">{intl.formatMessage({ id: "delivery" })}</Link>
				<Link  to={`/contacts`} className="nav__menu-item">{intl.formatMessage({ id: "contacts" })}</Link>
			</ul>
		</nav>
	)
}
export default NavBar;
