import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../components/Buttons/Button';
import Error from '../../components/Error';
import SectionTitle from '../../components/Headers/SectionTitle';
import CommonInput from '../../components/Inputs/CommonInput';
import CenterLayout from '../../components/Layouts/CenterLayout';
import { Context } from '../../contexts/Context';
import { FormType } from '../../types/custom';
import api from '../../utils/axios';


type LoginCredential = {
	email: string;
	password: string;
	loading: boolean;
	error: {
		email: string;
		password: string;
		common: string
	}
}

export default function SignIn() {
	const [loginCredentials, setLoginCredentials] = useState<LoginCredential>({ email: "", password: "", loading: false, error: { email: "", password: "", common: "" } })
	const navigate = useNavigate();
	const { dispatch, state } = useContext(Context);
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		// const _token = Cookies.get("_token");
		const _token = localStorage.getItem('_token');

		_token && state.authenticated && navigate(from);
	}, [from, navigate, state.authenticated, dispatch]);

	const handleSubmit = async (e: FormType) => {
		e.preventDefault();

		if (!loginCredentials.password) return setLoginCredentials(prev => ({
			...prev,
			error: {
				...prev.error,
				password: "Required Field"
			}
		}))

		if (!loginCredentials.email) return setLoginCredentials(prev => ({
			...prev,
			error: {
				...prev.error,
				email: "Required Field"
			}
		}))

		try {
			const response = await api.post(
				'/users/signin',
				JSON.stringify({
					email: loginCredentials.email,
					password: loginCredentials.password,
				})
			);

			dispatch({
				type: 'ADD_USER',
				payload: {
					name: response.data?.fullname,
					email: response.data?.email,
					role: response.data?.role,
					token: response.data?.token,
					ticket: response.data?.ticket,
				},
			});

			localStorage.setItem('_token', response.data?.token);

			if (response.data?.role === 'user') {
				navigate('/profile', { replace: true });
				return;
			}

			navigate('/dashboard', { replace: true });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				setLoginCredentials(prev => ({
					...prev,
					error: {
						...prev.error,
						common: message
					}
				}))
				return;
			}
			setLoginCredentials(prev => ({
				...prev,
				error: {
					...prev.error,
					common: 'Something Went Wrong! Please Try Again.'
				}
			}))
		}
	};

	return (
		<CenterLayout smWidth>
			<SectionTitle title='Login' />
			<form onSubmit={handleSubmit} className='space-y-4 mb-3'>
				<CommonInput
					change={(e) => {
						setLoginCredentials(prev => ({
							...prev,
							email: e.target.value
						}))
					}}
					label='Email'
					name='email'
					placeholder='example@zubayer.com'
					type="email"
					value={loginCredentials?.email}
					disableAutoComplete
					required
					inputClasses='bg-gray-100'
					error={loginCredentials.error.email}
				/>

				<CommonInput
					change={(e) => {
						setLoginCredentials(prev => ({
							...prev,
							password: e.target.value
						}))
					}}
					label='Password'
					name='password'
					placeholder='*******'
					type="password"
					value={loginCredentials.password}
					required
					inputClasses='bg-gray-100'
					error={loginCredentials.error.password}
				/>

				<div className='flex items-center gap-3'>
					<SubmitButton text='Login Account' />
					<Link
						to={'/sign-up'}
						className='text-emerald-500 p-2 hover:underline'
					>
						Create Account
					</Link>
				</div>
			</form>

			{loginCredentials.error.common ?
				<Error error={loginCredentials.error.common} />
				: null}
		</CenterLayout>
	);
}
