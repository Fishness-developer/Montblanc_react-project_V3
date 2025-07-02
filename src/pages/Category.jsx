import React from 'react';
import LeftSidebar from "../components/LeftSidebar/LeftSidebar.jsx";
import CatalogContainer
	from "../components/CatalogContainer/CatalogContainer.jsx";
import CategoryContainer
	from "../components/CategoryContainer/CategoryContainer.jsx";

const Category = () => {
	return (
		<section className="section_catalog">
			<div className="section_catalog__container">
				<div className="left_sidebar">
					<h3>Catalog</h3>
					<LeftSidebar />
				</div>
				<div className="right_sidebar">
					<ul className="section_01__promotions">
						<CategoryContainer />
					</ul>
				</div>
			</div>


		</section>
	);
};

export default Category;
