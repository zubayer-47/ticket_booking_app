import axios from 'axios';

export const ORIGIN = 'https://bus-booking-api.onrender.com';
// export const ORIGIN =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_ORIGIN
//     : "http://localhost:8000/v1";

const api = axios.create({
	baseURL: `${ORIGIN}/v1`,
	withCredentials: true,
	headers: {
		'Content-type': 'application/json',
	},
});

api.interceptors.request.use(
	function (config) {
		const _token = localStorage.getItem('_token');

		if (_token) config.headers.Authorization = _token;

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default api;

// api.interceptors.response.use(
//   function (config) {
//     const _token = localStorage.getItem("_token");

//     config.headers.Authorization = _token;

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
