import axios from "axios";

const httpRequest = async (method, url, data) => {
	try {
		const token = localStorage.getItem('token');
		const headers = token ?{
					 Authorization:`Bearer ${token}`
		}:{}
		const response = await axios({
			method, url, data, headers
		})
		return response.data;
	} catch (error) {
		console.error(`${method} ${url}`, {message: error.message, status: error.response.status, data: error.response.data, stack:error.stack});
	}
}


const api = {
	products: {
		getProduct: (productId) => httpRequest('GET', `http://194.113.32.17:8080/products?product_id=${productId}`),
		getProductsList: (categoryId) => httpRequest('GET', `http://194.113.32.17:8080/products?category_id=${categoryId}`)
	},
	category:{
		getCategories: () => httpRequest('GET', 'http://194.113.32.17:8080/categories'),
	},
	cart:{
		postOrder:(userId, orderData) => httpRequest('POST', `http://194.113.32.17:8080/cart?user_id=${userId}`, orderData),
	}
}
export default api;