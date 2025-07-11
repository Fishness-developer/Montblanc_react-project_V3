import React from 'react';

const MailIcon = ({width, height, fill}) => {
	return (
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill}   viewBox="0 -960 960 960" ><path d="M165.83-158.17q-43.63 0-74.41-30.96-30.77-30.95-30.77-74.26v-433.55q0-43.31 30.77-74.1 30.78-30.79 74.41-30.79h628.34q43.63 0 74.41 30.96 30.77 30.95 30.77 74.26v433.55q0 43.31-30.77 74.1-30.78 30.79-74.41 30.79H165.83ZM480-402.07 165.83-580.3v316.95h628.34V-580.3L480-402.07Zm0-112.06 320.98-182.52H159.02L480-514.13ZM159.02-580.3v-116.35V-263.35h6.81-6.81V-580.3Z"/></svg>
		</div>
	);
};

export default MailIcon;
