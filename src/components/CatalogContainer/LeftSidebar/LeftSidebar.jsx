import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import allCatalogItems from '../../../data/package_sidebar_list.json';

const LeftSidebar = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const handleItemClick = (event, index) => {
		// Проверяем, был ли клик по элементу подменю
		if (event.target.closest('.catalog__sublist')) {
			return; // Не закрываем подменю, если клик был по подкатегории
		}
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<ul className="catalog__list">
			{allCatalogItems.map((item, index) => (
				<li
					key={item.id}
					data-catalog-list
					className={openIndex === index ? 'open' : ''}
					onClick={(event) => item.subcategory.length > 0 ? handleItemClick(event, index) : undefined}
				>
					<Link to={`/catalog/${item.category.toLowerCase().replace(/\s+/g, '-')}`}>
						<span className="catalog__item">
							{item.category}
						</span>
					</Link>
					{/*{item.subcategory.length > 0 && (*/}
					{/*	<ul*/}
					{/*		className={`catalog__sublist ${openIndex === index ? '' : 'hide_list'}`}*/}
					{/*	>*/}
					{/*		{item.subcategory.map((subItem, subIndex) => (*/}
					{/*			<li key={subItem.id}>*/}
					{/*				<Link to={`/catalog/${item.category.toLowerCase().replace(/\s+/g, '-')}/${subItem.category.toLowerCase().replace(/\s+/g, '-')}`}>*/}
					{/*					<span className="catalog__subitem">*/}
					{/*						{subItem.category}*/}
					{/*					</span>*/}
					{/*				</Link>*/}
					{/*			</li>*/}
					{/*		))}*/}
					{/*	</ul>*/}
					{/*)}*/}
				</li>
			))}
		</ul>
	);
};

export default LeftSidebar;