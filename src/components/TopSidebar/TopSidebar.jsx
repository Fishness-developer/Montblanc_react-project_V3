// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
// import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";
//
//
// const TopSidebar = () => {
// 	const { category } = useParams(); // Получаем slug категории из URL
// 	const { categoriesList } = useGetCategories();
// 	const { locale } = useLanguage(); // Получаем текущую локаль
// 	const defaultCategoryId = 1;
//
// 	// Функция для получения имени категории по локали (для UI)
// 	const getNameByLocale = (item, locale) => {
// 		if (locale === 'ru' && item.name_ru) return item.name_ru;
// 		if (locale === 'he' && item.name_he) return item.name_he;
// 		return item.name; // Запасной вариант для 'en' или если перевод отсутствует
// 	};
//
// 	// Функция для генерации slug из английского имени
// 	const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');
//
// 	return (
// 		<select className={`select__list lang-${locale}`}>
// 			{categoriesList.map((item) => {
// 				const categoryName = getNameByLocale(item, locale); // Локализованное имя для UI
// 				const categorySlug = generateSlug(item.name); // Slug всегда на основе item.name (английский)
//
// 				// Проверяем, выбрана ли категория (используем английский slug)
// 				const isSelected = category
// 					? categorySlug === category
// 					: item.id === defaultCategoryId;
//
// 				return (
// 					<option
// 						key={item.id}
// 						data-catalog-list
// 						className={`${isSelected ? 'selected' : ''}`}
// 					>
// 						<Link to={`/catalog/${categorySlug}`}>
// 							<span className="select__item">{categoryName}</span>
// 						</Link>
// 					</option>
// 				);
// 			})}
// 		</select>
//
// 	);
// };
//
//
// export default TopSidebar;
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";

const TopSidebar = () => {
	const { category } = useParams(); // Получаем slug категории из URL
	const { categoriesList } = useGetCategories();
	const { locale } = useLanguage(); // Получаем текущую локаль
	const navigate = useNavigate(); // Хук для программной навигации
	const defaultCategoryId = 1;

	// Функция для получения имени категории по локали (для UI)
	const getNameByLocale = (item, locale) => {
		if (locale === 'ru' && item.name_ru) return item.name_ru;
		if (locale === 'he' && item.name_he) return item.name_he;
		return item.name; // Запасной вариант для 'en' или если перевод отсутствует
	};

	// Функция для генерации slug из английского имени
	const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

	// Обработчик изменения выбора в select
	const handleCategoryChange = (event) => {
		const selectedCategoryId = event.target.value; // Получаем ID выбранной категории
		const selectedCategory = categoriesList.find(
			(item) => item.id === parseInt(selectedCategoryId)
		);
		if (selectedCategory) {
			const categorySlug = generateSlug(selectedCategory.name);
			navigate(`/catalog/${categorySlug}`); // Переходим на страницу категории
		}
	};

	return (
		<select
			className={`select__list lang-${locale}`}
			onChange={handleCategoryChange}
			value={
				categoriesList.find(
					(item) => generateSlug(item.name) === category
				)?.id || defaultCategoryId
			}
		>
			{categoriesList.map((item) => {
				const categoryName = getNameByLocale(item, locale); // Локализованное имя для UI
				const categorySlug = generateSlug(item.name); // Slug на основе английского имени

				return (
					<option
						key={item.id}
						value={item.id} // Используем ID как значение
						className={categorySlug === category ? 'selected' : ''}
					>
						{categoryName}
					</option>
				);
			})}
		</select>
	);
};

export default TopSidebar;