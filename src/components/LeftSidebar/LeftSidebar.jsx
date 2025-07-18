// LeftSidebar.jsx
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import allCatalogItems from '../../data/package_sidebar_list.json';
import axios from "axios";
import api from "../../api/api.js";
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";

const LeftSidebar = ({setCategoryId, categoryId}) => {
	const [openIndex, setOpenIndex] = useState(null);
	const handleItemClick = (event, id) => {
		setCategoryId(id)
	};
	const {categoriesList} = useGetCategories()
	console.log("categoriesList: ",categoriesList)
	return (
		<ul className="catalog__list">
			{categoriesList.map((item, index) => (
				<li
					key={item.id}
					data-catalog-list
					className={`${openIndex === index ? 'open' : ''} ${item.id === categoryId ? 'selected' : ''}`}
					onClick={(event) => handleItemClick(event, item.id)}
				>
					<span className="catalog__item">{item.name}</span>  {/* Изменено на item.name */}
				</li>
			))}
		</ul>
	);
};

export default LeftSidebar;