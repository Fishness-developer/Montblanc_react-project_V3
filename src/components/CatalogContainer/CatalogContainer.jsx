// import React, {useEffect, useState} from 'react';
// import Product from "../Product/Product.jsx";
// import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
// import api from "../../api/api.js"; // Импорт API
// import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
// import {useDispatch, useSelector} from "react-redux";
// import {
// 	fetchProductsByCategory
// } from "../../redux/slices/productsSlice/productsSlice.js";
// import {
// 	selectProducts
// } from "../../redux/slices/productsSlice/productsSelectors.js"; // Хук для категорий
//
// const CatalogContainer = () => {
// 	const [productsByCategories, setProductsByCategories] = useState([]);
// 	const [categoryId, setCategoryId] = useState(1);
// 	const [categoryName, setCategoryName] = useState('');
// 	const dispatch = useDispatch();
// 	const {categoriesList} = useGetCategories();
// 	const products = useSelector(selectProducts);
//
// 	const fetchProducts = async (catId) => {
// 		try {
// 			// Находим имя категории по ID из списка категорий
// 			const selectedCategory = categoriesList.find(item => item.id === catId);
// 			const name = selectedCategory ? selectedCategory.name : 'All Products'; // Используем 'name' из API для категорий
// 			setCategoryName(name);
// 			dispatch(fetchProductsByCategory(catId));
//
// 			// Загружаем продукты из API по categoryId
// 			// const products = await api.products.getProductsList(catId);
// 			// console.log("Товары из API:", products); // Для отладки
//
// 			// Нормализуем данные для соответствия ожидаемому формату в коде
// 			const normalizedProducts = products.map(product => ({
// 				id: product.id,
// 				title: product.name, // 'name' из API -> 'title' в коде
// 				price: parseFloat(product.price), // Преобразуем строку в число для .toFixed()
// 				image: `data:image/png;base64,${product.image}`, // Добавляем префикс для base64-изображения
// 				category: product.categoryName // 'categoryName' -> 'category'
// 			}));
//
// 			setProductsByCategories(Array.isArray(normalizedProducts) ? normalizedProducts : []);
// 		} catch (e) {
// 			console.error('Ошибка при получении продуктов:', e);
// 			setCategoryName('All Products');
// 			setProductsByCategories([]); // Пустой список в случае ошибки
// 			// Опционально: alert('Не удалось загрузить продукты. Проверьте сервер.');
// 		}
// 	};
//
// 	useEffect(() => {
// 		if (categoriesList.length > 0) { // Ждём, пока категории загрузятся
// 			fetchProducts(categoryId);
// 		}
// 	}, [categoryId, categoriesList]); // Зависимость от categoriesList
//
// 	return (
// 		<div className="section_catalog__container">
// 			<div className="left_sidebar">
// 				<h3>Catalog</h3>
// 				<LeftSidebar />
// 			</div>
// 			<div className="right_sidebar">
// 				<h2>{categoryName}</h2>
// 				<ul className="section_01__promotions">
// 					{productsByCategories.length === 0 ? (
// 						<p>Нет продуктов в этой категории или ошибка загрузки.</p> // Сообщение при пустом списке
// 					) : (
// 						productsByCategories.map((item) => (
// 							<Product
// 								key={item.id}
// 								product={item}
// 							/>
// 						))
// 					)}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// };
//
// export default CatalogContainer;

//
// import React, { useEffect, useMemo, useState } from "react";
// import Product from "../Product/Product.jsx";
// import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
// import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsByCategory } from "../../redux/slices/productsSlice/productsSlice.js";
// import {
// 	selectProductsByCategory,
// 	selectIsLoadingByCategory,
// 	selectErrorByCategory,
// } from "../../redux/slices/productsSlice/productsSelectors.js";
//
// const CatalogContainer = () => {
// 	const [categoryId, setCategoryId] = useState(1);
// 	const dispatch = useDispatch();
// 	const { categoriesList } = useGetCategories();
//
// 	const products = useSelector((state) => selectProductsByCategory(state, categoryId));
// 	const isLoading = useSelector((state) => selectIsLoadingByCategory(state, categoryId));
// 	const error = useSelector((state) => selectErrorByCategory(state, categoryId));
//
// 	const categoryName = useMemo(() => {
// 		const selectedCategory = categoriesList.find((item) => item.id === categoryId);
// 		return selectedCategory ? selectedCategory.name : "All Products";
// 	}, [categoryId, categoriesList]);
//
// 	useEffect(() => {
// 		if (categoriesList.length > 0) {
// 			dispatch(fetchProductsByCategory(categoryId));
// 		}
// 	}, [categoryId, dispatch, categoriesList]);
//
// 	return (
// 		<div className="section_catalog__container">
// 			<div className="left_sidebar">
// 				<h3>Catalog</h3>
// 				<LeftSidebar />
// 			</div>
// 			<div className="right_sidebar">
// 				<h2>{categoryName}</h2>
// 				{isLoading ? (
// 					<p>Loading products...</p>
// 				) : error ? (
// 					<p>Loading error: {error}. Try later.</p>
// 				) : products.length === 0 ? (
// 					<p>Category is empty.</p>
// 				) : (
// 					<ul className="section_01__promotions">
// 						{products.map((item) => (
// 							<Product key={item.id} product={item} />
// 						))}
// 					</ul>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
//
// export default CatalogContainer;

// import React, { useEffect, useMemo, useState } from "react";
// import Product from "../Product/Product.jsx";
// import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
// import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductsByCategory } from "../../redux/slices/productsSlice/productsSlice.js";
// import {
// 	selectProductsByCategory,
// 	selectIsLoadingByCategory,
// 	selectErrorByCategory,
// } from "../../redux/slices/productsSlice/productsSelectors.js";
// import {useIntl} from "react-intl";
//
// const ProductsList = React.memo(({ products }) => (
// 	<ul className="section_01__promotions">
// 		{products.map((item) => (
// 			<Product
// 				key={item.id}
// 				product={item}
// 				showDiscount={!!item.discount}
// 			/>
// 		))}
// 	</ul>
// ));
//
// const CatalogContainer = () => {
// 	const intl = useIntl();
// 	const [categoryId, setCategoryId] = useState(1);
// 	const dispatch = useDispatch();
// 	const { categoriesList } = useGetCategories();
//
// 	const products = useSelector((state) => selectProductsByCategory(state, categoryId));
// 	const isLoading = useSelector((state) => selectIsLoadingByCategory(state, categoryId));
// 	const error = useSelector((state) => selectErrorByCategory(state, categoryId));
//
// 	const categoryName = useMemo(() => {
// 		const selectedCategory = categoriesList.find((item) => item.id === categoryId);
// 		return selectedCategory ? selectedCategory.name : "All products";
// 	}, [categoryId, categoriesList]);
//
// 	useEffect(() => {
// 		if (categoriesList.length > 0) {
// 			dispatch(fetchProductsByCategory(categoryId));
// 		}
// 	}, [categoryId, dispatch, categoriesList]);
//
// 	return (
// 		<div className="section_catalog__container">
// 			<div className="left_sidebar">
// 				<h3>{intl.formatMessage({ id: "catalog" })}</h3>
// 				<LeftSidebar />
// 			</div>
// 			<div className="right_sidebar">
// 				<h2>{categoryName}</h2>
// 				{isLoading ? (
// 					<p>Loading...</p>
// 				) : error ? (
// 					<p>Error: {error}. Tray again.</p>
// 				) : products.length === 0 ? (
// 					<p>Category is empty</p>
// 				) : (
// 					<ProductsList products={products} />
// 				)}
// 			</div>
// 		</div>
// 	);
// };
//
// export default CatalogContainer;


import React, { useEffect, useMemo, useState } from "react";
import Product from "../Product/Product.jsx";
import LeftSidebar from "../LeftSidebar/LeftSidebar.jsx";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/slices/productsSlice/productsSlice.js";
import {
	selectProductsByCategory,
	selectIsLoadingByCategory,
	selectErrorByCategory,
} from "../../redux/slices/productsSlice/productsSelectors.js";
import { useIntl } from "react-intl";
import { useLanguage } from "../../context/LanguageContext/LanguageContext.jsx";

const ProductsList = React.memo(({ products }) => (
	<ul className="section_01__promotions">
		{products.map((item) => (
			<Product
				key={item.id}
				product={item}
				showDiscount={!!item.discount}
			/>
		))}
	</ul>
));

const CatalogContainer = () => {
	const intl = useIntl();
	const { locale } = useLanguage(); // Получаем текущую локаль
	const [categoryId, setCategoryId] = useState(1);
	const dispatch = useDispatch();
	const { categoriesList } = useGetCategories();

	const products = useSelector((state) => selectProductsByCategory(state, categoryId));
	const isLoading = useSelector((state) => selectIsLoadingByCategory(state, categoryId));
	const error = useSelector((state) => selectErrorByCategory(state, categoryId));

	// Функция для получения имени категории по локали (для UI)
	const getNameByLocale = (item, locale) => {
		if (locale === 'ru' && item.name_ru) return item.name_ru;
		if (locale === 'he' && item.name_he) return item.name_he;
		return item.name; // Запасной вариант для 'en' или если перевод отсутствует
	};

	const categoryName = useMemo(() => {
		const selectedCategory = categoriesList.find((item) => item.id === categoryId);
		return selectedCategory ? getNameByLocale(selectedCategory, locale) : intl.formatMessage({ id: "allProducts" });
	}, [categoryId, categoriesList, locale, intl]);

	useEffect(() => {
		if (categoriesList.length > 0) {
			dispatch(fetchProductsByCategory(categoryId));
		}
	}, [categoryId, dispatch, categoriesList]);

	return (
		<div className="section_catalog__container">
			<div className="left_sidebar">
				<h3>{intl.formatMessage({ id: "catalog" })}</h3>
				<LeftSidebar />
			</div>
			<div className="right_sidebar">
				<h2>{categoryName}</h2>
				{isLoading ? (
					<p>{intl.formatMessage({ id: "loading" })}</p>
				) : error ? (
					<p>{intl.formatMessage({ id: "error" })}: {error}. {intl.formatMessage({ id: "tryAgain" })}</p>
				) : products.length === 0 ? (
					<p>{intl.formatMessage({ id: "categoryEmpty" })}</p>
				) : (
					<ProductsList products={products} />
				)}
			</div>
		</div>
	);
};

export default CatalogContainer;