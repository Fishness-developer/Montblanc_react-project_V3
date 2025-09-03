import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext/LanguageContext';
import useGetCategories from '../CatalogContainer/hooks/useGetCategories.jsx';
import { useSelector } from 'react-redux';
import { selectProductsByCategory } from '../../redux/slices/productsSlice/productsSelectors.js';
import { formatForUrl } from '../../utils/format.js';


// Сопоставление маршрутов с их переведёнными названиями
const staticPages = {
	'all-offers': 'All Offers',
	delivery: 'Delivery',
	contacts: 'Contacts',
	order: 'Order',
};

const BreadCrumbs = () => {
	const { translate, language } = useLanguage();
	const { categoriesList } = useGetCategories();
	const location = useLocation();
	const products = useSelector((state) =>
		Object.values(state.products.byCategory).flatMap((category) => category?.products || [])
	);

	const crumbs = useMemo(() => {
		const pathnames = location.pathname.split('/').filter((x) => x);
		const result = [{ path: '/', label: translate('Home') }];

		let currentPath = '';

		pathnames.forEach((segment, index) => {
			currentPath += `/${segment}`;

			if (segment === 'catalog' && index === 0) {
				result.push({ path: currentPath, label: translate('Catalog') });
			} else if (index === 1 && pathnames[0] === 'catalog') {
				const category = categoriesList.find(
					(item) => formatForUrl(item.name) === segment
				);
				const label = category ? category.name : segment;
				result.push({ path: currentPath, label });
			} else if (index === 2 && pathnames[0] === 'catalog') {
				const product = products.find((p) => p.id === segment);
				const label = product ? product.title : `Product ${segment}`;
				result.push({ path: currentPath, label });
			} else if (index === 0 && staticPages[segment]) {
				// Обработка статических страниц
				result.push({ path: currentPath, label: translate(staticPages[segment]) });
			}
		});

		return result;
	}, [location.pathname, categoriesList, products, translate, language]);

	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ul className={`breadcrumbs-list ${language === 'he' ? 'rtl' : ''}`}>
				{crumbs.map((crumb, index) => (
					<li key={crumb.path} className="breadcrumbs-item">
						{index === crumbs.length - 1 ? (
							<span className="breadcrumbs-current">{crumb.label}</span>
						) : (
							<>
								<Link to={crumb.path} className="breadcrumbs-link">
									{crumb.label}
								</Link>
								<span className="breadcrumbs-separator">
                  {language === 'he' ? ' ← ' : ' → '}
                </span>
							</>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default BreadCrumbs;





// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
//
// const BreadCrumbs = () => {
// 	const location = useLocation();
// 	const pathnames = location.pathname.split('/').filter((x) => x);
//
// 	return (
// 		<nav className="breadcrumbs">
//       <span className="breadcrumbs-item">
//         <Link to="/">Home</Link>
//       </span>
// 			{pathnames.map((value, index) => {
// 				const to = `/${pathnames.slice(0, index + 1).join('/')}`;
// 				const isLast = index === pathnames.length - 1;
//
// 				return (
// 					<span key={to} className="breadcrumbs-item">
//             {isLast ? (
// 							<span>{decodeURIComponent(value)}</span>
// 						) : (
// 							<Link to={to}>{decodeURIComponent(value)}</Link>
// 						)}
// 						{!isLast && <span className="separator"> / </span>}
//           </span>
// 				);
// 			})}
// 		</nav>
// 	);
// };
//
// export default BreadCrumbs;



