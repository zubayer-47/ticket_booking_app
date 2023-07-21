/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const useAxios = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const requestIntercept = api.interceptors.request.use(
			(config: any) => {
				if (!config.headers.Authorization) {
					const _token = Cookies.get('_token');
					config.headers.Authorization = `${_token}`;
				}
				return config;
			},
			(error: any) => Promise.reject(error)
		);

		const responseIntercept = api.interceptors.response.use(
			(response: any) => response,
			async (error: {
				message: string;
				config: any;
				response: { status: any; data: any };
			}) => {
				if (error.message !== 'canceled') {
					const prevRequest = error?.config;
					const { status } = error.response;
					if (status === 403 && !prevRequest?.sent) {
						localStorage.clear();
						navigate('/login');
					}
					if (status === 401) {
						localStorage.clear();
						navigate('/login');
					}
					if (status === 429) {
						localStorage.clear();
						navigate('/login');
						return Promise.reject();
					}
					if (status === 503) {
						localStorage.clear();
						navigate('/login');
						// window.location.reload();
						return Promise.reject();
					}
					if (!error?.response) {
						alert('No server response!');
						return Promise.reject();
						// localStorage.removeItem('access_token');
						// window.location.reload();
					}
					// console.log(error?.response?.status, '-request-error-');
					return Promise.reject(error);
				}

				return null;
			}
		);

		return () => {
			api.interceptors.request.eject(requestIntercept);
			api.interceptors.response.eject(responseIntercept);
		};
	}, []);

	return api;
};

export default useAxios;
