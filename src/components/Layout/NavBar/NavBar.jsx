import "../../../styles/nav.scss"
import {Link, Route} from 'react-router-dom';
import {useIntl} from "react-intl";


const NavBar = () =>{
	const intl = useIntl();
	return (
		<nav className="nav">
			<ul className="nav__menu">
				<Link  to={`/catalog`} className="nav__menu-item"> {intl.formatMessage({ id: "catalog" })} </Link>
				<Link  to={`/special-offers`} className="nav__menu-item">{intl.formatMessage({ id: "specialOffers" })}</Link>
				<Link  to={`/delivery`} className="nav__menu-item">{intl.formatMessage({ id: "delivery" })}</Link>
				<Link  to={`/contacts`} className="nav__menu-item">{intl.formatMessage({ id: "contacts" })}</Link>
			</ul>
		</nav>
	)
}
export default NavBar;
