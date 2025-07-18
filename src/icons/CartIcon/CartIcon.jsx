import React from 'react';
import {SvgIcon} from "@mui/material";

const CartIcon =  ({ width, height, fill }) => {
	return (
		<div>
			<svg viewBox="0 0 24 20" width={width} height={height} fill={fill} xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M12.9055 0.442571L17.6836 7.35511H22.9091C23.5091 7.35511 24 7.82929 24 8.40885L23.9673 8.69336L21.1964 18.4615C20.9345 19.3467 20.0945 20 19.0909 20H4.90909C3.90545 20 3.06545 19.3467 2.81455 18.4615L0.0436363 8.69336C0.0109091 8.59853 0 8.50369 0 8.40885C0 7.82929 0.490909 7.35511 1.09091 7.35511H6.31636L11.0945 0.453109C11.3018 0.147524 11.6509 0 12 0C12.3491 0 12.6982 0.147524 12.9055 0.442571ZM12 2.71865L8.72727 7.35511H15.2727L12 2.71865Z" fill="white"/>
			</svg>

		</div>
	);
};

export default CartIcon;
