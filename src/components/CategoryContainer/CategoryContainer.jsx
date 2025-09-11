import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from "../Product/Product.jsx";
import api from "../../api/api.js";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
import { useIntl } from "react-intl";
import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";
import TopSidebar from "../TopSidebar/TopSidebar.jsx";

const CategoryContainer = () => {
	const intl = useIntl();
	const { locale } = useLanguage(); // Получаем текущую локаль
	const { category } = useParams();
	const [productsByCategories, setProductsByCategories] = useState([]);
	const [categoryName, setCategoryName] = useState('');
	const { categoriesList } = useGetCategories();

	// Функция для получения имени категории по локали (для UI)
	const getNameByLocale = (item, locale) => {
		if (locale === 'ru' && item.name_ru) return item.name_ru;
		if (locale === 'he' && item.name_he) return item.name_he;
		return item.name; // Запасной вариант для 'en' или если перевод отсутствует
	};

	useEffect(() => {
		if (categoriesList.length > 0 && category) {
			const selectedCategory = categoriesList.find(item =>
				item.name.toLowerCase().replace(/\s+/g, '-') === category
			);
			if (selectedCategory) {
				setCategoryName(getNameByLocale(selectedCategory, locale)); // Локализованное имя для заголовка
				fetchProducts(selectedCategory.id);
			} else {
				setCategoryName(intl.formatMessage({ id: "categoryNotFound" })); // Перевод для 'Category Not Found'
				setProductsByCategories([]);
			}
		}
	}, [category, categoriesList, locale, intl]);

	const fetchProducts = async (catId) => {
		try {
			const products = await api.products.getProductsList(catId);
			const normalizedProducts = products.map(product => ({
				id: product.id,
				title: product.name,
				price: parseFloat(product.price),
				image: `data:image/png;base64,${product.image}`,
				category: product.categoryName
			}));
			setProductsByCategories(Array.isArray(normalizedProducts) ? normalizedProducts : []);
		} catch (e) {
			console.error('Ошибка при получении продуктов:', e);
			setProductsByCategories([]);
		}
	};

	return (
		<div className="section_catalog__container">
						<div className="left_sidebar">
				<h3>{intl.formatMessage({ id: "catalog" })}</h3>
				<LeftSidebar />
			</div>
			<div className="right_sidebar">
				<h2>{categoryName}</h2>
				<ul className="section_01__promotions">
					{productsByCategories.length === 0 ? (
						<p>{intl.formatMessage({ id: "categoryEmpty" })}</p> // Перевод для 'Category is empty'
					) : (
						productsByCategories.map((item) => (
							<Product
								key={item.id}
								product={item}
							/>
						))
					)}
				</ul>
			</div>
		</div>
	);
};

export default CategoryContainer;