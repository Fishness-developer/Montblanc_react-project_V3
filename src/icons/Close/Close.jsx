import React from 'react';

const Close = ({ width, height, fill }) => {
	return (
		<div>
			<svg width={width} height={height} viewBox="0 0 18 18" fill={fill} xmlns="http://www.w3.org/2000/svg">
				<circle cx="9" cy="9" r="8.5" stroke="#2C2C2C"/>
				<rect x="5" y="6.14285" width="1.61624" height="9.69745" rx="0.808121" transform="rotate(-45 5 6.14285)" fill="#2C2C2C"/>
				<rect x="6.14307" y="13" width="1.61624" height="9.69745" rx="0.808121" transform="rotate(-135 6.14307 13)" fill="#2C2C2C"/>
			</svg>
		</div>
	);
};

export default Close;
