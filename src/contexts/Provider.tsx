import axios from 'axios';
import { ReactNode, useEffect, useMemo, useReducer } from 'react';
import { ActionType, InitialStateType } from '../types/state.types';
import api from '../utils/axios';
import { Context } from './Context';

const initialState: InitialStateType = {
	user: {
		name: '',
		email: '',
		role: '',
		token: '',
		ticket: '',
	},
	searchProds: {
		fromID: null,
		list: [],
		status: null
	},
	passengerPersonalInfo: {
		info: {
			name: "",
			gender: "",
			email: "",
			age: 0,
			boarding_point: "",
			dropping_point: "",
			mobile: 0,
			isAgree: false,
		},
		loading: false
	},
	authenticated: false,
	isLoading: true,
};

function reducer(
	state: InitialStateType,
	action: ActionType
): InitialStateType {
	// fromReducer(state, action)

	switch (action.type) {
		// user
		case 'ADD_USER':
			return {
				...state,
				user: action.payload,
				authenticated: true,
				isLoading: false,
			};
		case 'REMOVE_USER':
			return initialState;
		case 'LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case "ADD_PRODS":
			return {
				...state,
				searchProds: {
					...state.searchProds,
					list: action.payload.list,
					fromID: action.payload.fromID
				}
			}
		case "REMOVE_PRODS":
			return {
				...state,
				searchProds: {
					...state.searchProds,
					list: [],
					fromID: null
				}
			}
		case "ADD_PRODS_STATUS":
			return {
				...state,
				searchProds: {
					...state.searchProds,
					status: action.payload,
				}
			}
		case "ADD_PASSENGER_INFO":
			return {
				...state,
				passengerPersonalInfo: {
					...state.passengerPersonalInfo,
					info: {
						...state.passengerPersonalInfo.info,
						[action.payload.name]: action.payload.value
					}
				}
			}
		case "REMOVE_PASSENGER_INFO":
			return {
				...state,
				passengerPersonalInfo: {
					...state.passengerPersonalInfo,
					info: {
						name: "",
						gender: "",
						email: "",
						age: 0,
						boarding_point: "",
						dropping_point: "",
						mobile: 0,
						isAgree: false,
					}
				}
			}
		case "PASSENGER_LOADING":
			return {
				...state,
				passengerPersonalInfo: {
					...state.passengerPersonalInfo,
					loading: action.payload
				}
			}
		default:
			return state;
	}
}

export default function Provider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	// handle error boundary
	useEffect(() => {
		// dispatch({ type: 'LOADING', payload: true });

		const controller = new AbortController();
		const userToken = localStorage.getItem('_token');
		// console.log('userToken :', userToken);

		if (!userToken) dispatch({ type: 'LOADING', payload: false });

		if (userToken)
			(async () => {
				try {
					const res = await api.get('/users/me', {
						// headers: {
						// 	Authorization: userToken,
						// },
						signal: controller.signal,
					});

					// setLocalStorage(res.data?.token)
					dispatch({
						type: 'ADD_USER',
						payload: {
							name: res.data?.fullname,
							email: res.data?.email,
							role: res.data?.role,
							token: res.data?.token,
							ticket: res.data?.ticket,
						},
					});
					// localStorage.setItem('_token', res.data?.token);
				} catch (error) {
					if (axios.isAxiosError(error)) {
						// const message = error.response?.data?.message;
						if (error.response?.status === 401)
							localStorage.removeItem('_token');
						// handle error manually
						// if (error.status)
					}
				}
				// test purpose
				dispatch({ type: 'LOADING', payload: false });
			})();

		// fetchUser();

		return () => controller.abort();
	}, []);

	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

	return <Context.Provider value={value}>{children}</Context.Provider>;
}
