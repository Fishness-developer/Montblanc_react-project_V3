// LeftSidebar.jsx
import React from 'react';
import {Link, useParams} from 'react-router-dom';
import useGetCategories from "../CatalogContainer/hooks/useGetCategories.jsx";

const LeftSidebar = () => {
	const {category} = useParams();
	const {categoriesList} = useGetCategories()
	const defaultCategoryId = 1;
	console.log("categoriesList: ",categoriesList)
	return (
		<ul className="catalog__list">
			{categoriesList.map((item, index) => {
				const cat = item.name.toLowerCase().replace(/\s+/g, '-');
				const isSelected = category
					? cat === category
					: item.id === defaultCategoryId;
				return (
					<li
						key={item.id}
						data-catalog-list
						className={`${isSelected ? 'selected' : ''}`}
					>
						<Link to={`/catalog/${cat}`}>
							<span className="catalog__item">{item.name}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default LeftSidebar;