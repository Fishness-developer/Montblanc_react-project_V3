import React from 'react';
import Spices from '../../../assets/images/banners/banner_spices.png'
import Cheeses from '../../../assets/images/banners/banner_cheese.png'
const Advertising = () => {
	return (
		<section className="section_02">
			<div className="section_02__banner container">
				<div className="section_02__banner container inner_left"><img
					src={Spices}
					width="955"
					height="200"
					alt=""
				/>
					<div className="text padding_right_50">
						<p className="padding_right_50">Traditional spices</p>
						<p>20% discount</p>
					</div>
				</div>
				<div className="section_02__banner container inner_right"><img
					src={Cheeses}
					width="965"
					height="200"
					alt=""
				/>
					<div className="text padding_left_50">
						<p>Italian cheeses</p>
						<p className="padding_left_50">at competitive prices</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Advertising;
