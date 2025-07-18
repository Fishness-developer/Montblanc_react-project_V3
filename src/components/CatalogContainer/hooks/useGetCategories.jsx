import React, { useEffect, useState } from 'react';
import api from "../../../api/api.js";

const useGetCategories = () => {
	const [categoriesList, setCategoriesList] = useState([]);

	const fetchCategoriesList = async () => {
		try {
			const categories = await api.category.getCategories();
			setCategoriesList(categories);
		} catch (e) {
			console.log('Ошибка при получении категорий:', e);
		}
	};

	useEffect(() => {
		fetchCategoriesList();
	}, []);

	return { categoriesList };
};

export default useGetCategories;