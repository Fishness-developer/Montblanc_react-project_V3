// import React, { useState } from "react";
// import Close from "../../icons/Close/Close.jsx";
// import api from "../../api/api.js";
// import axios from "axios";
//
// const closeStyle = {
// 	width: "20px",
// 	height: "20px",
// 	fill: "#ffffff",
// };
//
// const ModalOverlay = ({ isOverlayOpen, onCloseOverlay }) => {
// 	const [error, setError] = useState("");
// 	const [loading, setLoading] = useState(false);
//
// 	const [formData, setFormData] = React.useState({
// 		login: "",
// 		password: ""
// 	});
//
// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({
// 			...prev,
// 			[name]: value,
// 		}));
// 	};
//
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setError("");
// 		setLoading(true);
//
// 		const loginData ={
// 			login: formData.login,
// 			password: formData.password
// 		}
//
// 		try {
// 			console.log('loginData:', loginData);
// 			const response = await api.auth.login(loginData);
//
// 			console.log('Server response:', response);
// 			if (response.success) {
// 				// Перенаправление на панель администратора backend после успешного логина
// 				window.location.href = 'http://194.113.32.17:8080/adminPanel';
// 			} else {
// 				setError(response.error || "Произошла ошибка при входе");
// 			}
// 		} catch (err) {
// 			console.error('Order error:', err);
// 			setError(err.response?.data?.message || "Произошла ошибка при входе");
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
//
// 	const handleClose = (e) => {
// 		e.preventDefault();
// 		onCloseOverlay();
// 	};
//
// 	return (
// 		<div className="overlay" data-modal-autorization="">
// 			<div className="popup_autorization">
// 				<div className="popup_autorization__container">
// 					<div className="popup_autorization__header">
// 						<h3>Authentication</h3>
// 						<button className="cart-close" onClick={handleClose}>
// 							<Close {...closeStyle} />
// 						</button>
// 					</div>
// 					<div className="popup_autorization__content">
// 						<form onSubmit={handleSubmit}>
// 							<input
// 								type="text"
// 								placeholder="Enter your login"
// 								name="login"
// 								value={formData.login}
// 								onChange={handleInputChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<input
// 								type="password"
// 								placeholder="Enter your password"
// 								name="password"
// 								value={formData.password}
// 								onChange={handleInputChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<button type="submit" className="button" disabled={loading}>
// 								{loading ? "Submitting..." : "Submit"}
// 							</button>
// 							{error && <div className="error-message">{error}</div>}
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
//
// export default ModalOverlay;

// import React, { useState } from "react";
// import Close from "../../icons/Close/Close.jsx";
// import api from "../../api/api.js";
// import axios from "axios";
//
// const closeStyle = {
// 	width: "20px",
// 	height: "20px",
// 	fill: "#ffffff",
// };
//
// const ModalOverlay = ({ isOverlayOpen, onCloseOverlay }) => {
// 	const [error, setError] = useState("");
// 	const [loading, setLoading] = useState(false);
//
// 	const [formData, setFormData] = React.useState({
// 		login: "",
// 		password: ""
// 	});
//
// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({
// 			...prev,
// 			[name]: value,
// 		}));
// 	};
//
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setError("");
// 		setLoading(true);
//
// 		const params = new URLSearchParams();
// 		params.append("login", formData.login);
// 		params.append("password", formData.password);
//
// 		try {
// 			console.log('loginData:', Object.fromEntries(params));
// 			const response = await api.auth.login(params);
//
// 			console.log('Server response:', response);
// 			// Reaching here means status 200 (failure, as success would redirect with 302)
// 			setError("Incorrect login or password");
// 		} catch (err) {
// 			console.error('Login error:', err);
// 			if (err.response?.status === 302) {
// 				const location = err.response.headers.location;
// 				window.location.href = new URL(location, 'http://194.113.32.17:8080/').href;
// 			} else {
// 				setError(err.response?.data?.message || "Произошла ошибка при входе");
// 			}
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
//
// 	const handleClose = (e) => {
// 		e.preventDefault();
// 		onCloseOverlay();
// 	};
//
// 	return (
// 		<div className="overlay" data-modal-autorization="">
// 			<div className="popup_autorization">
// 				<div className="popup_autorization__container">
// 					<div className="popup_autorization__header">
// 						<h3>Authentication</h3>
// 						<button className="cart-close" onClick={handleClose}>
// 							<Close {...closeStyle} />
// 						</button>
// 					</div>
// 					<div className="popup_autorization__content">
// 						<form onSubmit={handleSubmit}>
// 							<input
// 								type="text"
// 								placeholder="Enter your login"
// 								name="login"
// 								value={formData.login}
// 								onChange={handleInputChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<input
// 								type="password"
// 								placeholder="Enter your password"
// 								name="password"
// 								value={formData.password}
// 								onChange={handleInputChange}
// 								required=""
// 								minLength="3"
// 							/>
// 							<button type="submit" className="button" disabled={loading}>
// 								{loading ? "Submitting..." : "Submit"}
// 							</button>
// 							{error && <div className="error-message">{error}</div>}
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
//
// export default ModalOverlay;





import React, {useState} from "react";
import Close from "../../icons/Close/Close.jsx";


const closeStyle = {
	width: "20px",
	height: "20px",
	fill: "#ffffff",
};


const ModalOverlay = ({ isOverlayOpen, onCloseOverlay }) => {
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
							<input type="text" placeholder="Enter your login"	name="login" required="" minLength="3"/>
							<input type="password"	placeholder="Enter your password"	name="password"	required="" minLength="3" />
							<button	type="submit"	className="button">Submit</button>
						</form>

					</div>

				</div>
			</div>
		</div>
	);
};

export default ModalOverlay;


