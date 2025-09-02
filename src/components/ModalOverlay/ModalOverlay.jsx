import React from "react";
import Close from "../../icons/Close/Close.jsx";

const closeStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
};

const ModalOverlay = ({isOverlayOpen, onCloseOverlay}) => {
	const handleClose = (e) => {
		e.preventDefault();
		onCloseOverlay();
	};

	return (
		<div className="overlay" data-modal-autorization="">
			<div className="popup_autorization">
				<div className="popup_autorization__container">
					<div className="popup_autorization__header">
						<h3>Authentication</h3>
						<div className="popup_autorization__close">
							<button	className="cart-close" onClick={handleClose}>
								<Close {...closeStyle} />
							</button>
						</div>
					</div>
					<div className="popup_autorization__content">
						<form	action="http://194.113.32.17:8080/login" method="POST">
							<input type="text" placeholder="Enter your login" name="login" required=""	minLength="3"/>
							<input type="password" placeholder="Enter your password" name="password" required="" minLength="3"/>
							<button type="submit" className="button">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalOverlay;


// import React, {useState} from "react";
// import Close from "../../icons/Close/Close.jsx";
// import axios from "axios";
// import api from "../../api/api.js";
//
//
// const closeStyle = {
// 	width: "20px",
// 	height: "20px",
// 	fill: "#ffffff",
// };
//
//
// const ModalOverlay = ({isOverlayOpen, onCloseOverlay}) => {
//
// 	const [formData, setFormData] = useState({
// 		login: '',
// 		password: ''
// 	});
//
// 	const handleChange = (e) => {
// 		const {name, value} = e.target;
// 		setFormData(prev => ({...prev, [name]: value}));
// 	};
//
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
//
// 		// Подготавливаем данные в формате URLSearchParams
// 		const params = new URLSearchParams();
// 		params.append('login', formData.login);
// 		params.append('password', formData.password);
//
// 		try {
//
// 			const response = await api.auth.login(params);
// 			console.log('response:', response);
// 			console.log('Response from server:', response.data);
// 		} catch (error) {
// 			console.error('Error:', error);
// 		}
// 	};
//
//
// 	const handleClose = (e) => {
// 		e.preventDefault();
// 		onCloseOverlay();
// 	};
//
// 	return (
// 		<div
// 			className="overlay"
// 			data-modal-autorization=""
// 		>
// 			<div className="popup_autorization">
// 				<div className="popup_autorization__container">
// 					<div className="popup_autorization__header">
// 						<h3>Authentication</h3>
// 						<div className="popup_autorization__close">
// 							<button
// 								className="cart-close"
// 								onClick={handleClose}
// 							>
// 								<Close {...closeStyle} />
// 							</button>
// 						</div>
//
// 					</div>
// 					<div className="popup_autorization__content">
// 						<form onSubmit={handleSubmit}>
// 							<input
// 								type="text"
// 								placeholder="Enter your login"
// 								name="login"
// 								value={formData.login}
// 								onChange={handleChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<input
// 								type="password"
// 								placeholder="Enter your password"
// 								name="password"
// 								value={formData.password}
// 								onChange={handleChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<button
// 								type="submit"
// 								className="button"
// 							>Submit
// 							</button>
// 						</form>
//
// 					</div>
//
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
//
// export default ModalOverlay;




