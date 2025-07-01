import React, { useState } from 'react';

const Amount = () => {
	const [counter, setCounter] = useState(1);

	const handleDecrease = () => {
		if (counter > 1) {
			setCounter(prev => prev - 1);
		}
	};

	const handleIncrease = () => {
		setCounter(prev => prev + 1);
	};

	return (
		<div>
			<button
				data-amount-decrease
				onClick={handleDecrease}
				disabled={counter === 1}
			>
				-
			</button>
			<input
				className="amount-input"
				type="number"
				value={counter}
				readOnly
			/>
			<button
				data-amount-increase
				onClick={handleIncrease}
			>
				+
			</button>
		</div>
	);
};

export default Amount;