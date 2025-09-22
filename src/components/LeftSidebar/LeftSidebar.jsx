// LeftSidebar.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";
import {
	selectCategories
} from "../../redux/slices/categoriesSlice/categoriesSelectors.js";
import { useSelector } from "react-redux";

const LeftSidebar = () => {
	const { category } = useParams(); // Получаем slug категории из URL
	// const { categoriesList } = useGetCategories();
	const categoriesList = useSelector(selectCategories);
	const { locale } = useLanguage(); // Получаем текущую локаль
	const defaultCategoryId = 1;

	// Функция для получения имени категории по локали (для UI)
	const getNameByLocale = (item, locale) => {
		if (locale === 'ru' && item.name_ru) return item.name_ru;
		if (locale === 'he' && item.name_he) return item.name_he;
		return item.name; // Запасной вариант для 'en' или если перевод отсутствует
	};

	// Функция для генерации slug из английского имени
	const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

	return (
		<ul className={`catalog__list lang-${locale}`}>
			{categoriesList.map((item) => {
				const categoryName = getNameByLocale(item, locale); // Локализованное имя для UI
				const categorySlug = generateSlug(item.name); // Slug всегда на основе item.name (английский)

				// Проверяем, выбрана ли категория (используем английский slug)
				const isSelected = category
					? categorySlug === category
					: item.id === defaultCategoryId;

				return (
					<li
						key={item.id}
						data-catalog-list
						className={`${isSelected ? 'selected' : ''}`}
					>
						<Link to={`/catalog/${categorySlug}`}>
							<span className="catalog__item">{categoryName}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default LeftSidebar;