import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../components/Buttons/Button';
import Error from '../../components/Error';
import SectionTitle from '../../components/Headers/SectionTitle';
import CommonInput from '../../components/Inputs/CommonInput';
import CenterLayout from '../../components/Layouts/CenterLayout';
import CommonSelect from '../../components/Selects/CommonSelect';
import { Context } from '../../contexts/Context';
import { FormType, InputSelectChangeType } from '../../types/custom';
import api from '../../utils/axios';
import setLocalStorage from '../../utils/setLocalStorage';

type CredentialsType = {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
}

export default function SignUp() {
	const [error, setError] = useState({
		name: '',
		email: '',
		password: '',
		common: '',
	});
	const [credentials, setCredentials] = useState<CredentialsType>({ confirmPassword: "", password: "", email: "", fullname: "", role: "" })
	const navigate = useNavigate();

	const { dispatch } = useContext(Context);

	const handleChange = (e: InputSelectChangeType) => {
		setCredentials(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const handleSubmit = async (e: FormType) => {
		e.preventDefault();

		if (credentials.password !== credentials.confirmPassword) {
			setError((prev) => ({
				...prev,
				password: "password doesn't matched!",
			}));

			return;
		}

		const { confirmPassword, ...rest } = credentials

		try {
			const response = await api.post('/users/signup', rest);

			setLocalStorage(response.data?.token);

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

			if (response.data?.role === 'user') {
				navigate('/profile', { replace: true });
			} else {
				navigate('/dashboard', { replace: true });
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				setError(message);
				return;
			}
			setError((prev) => ({
				...prev,
				common: 'Something Went Wrong! Please Try Again.',
			}));
		}
	};

	return (
		<CenterLayout smWidth>
			<SectionTitle title='Create new account' />
			<form onSubmit={handleSubmit} className='mb-3'>
				<div className='text-center'><Error error={error.common} /></div>
				<CommonInput
					change={handleChange}
					label='Full Name'
					name='fullname'
					placeholder='your full name'
					type="text"
					value={credentials.fullname}
					disableAutoComplete
					required
					error={error.name}
					inputClasses='bg-gray-100'
				/>

				<CommonInput
					change={handleChange}
					label='Email'
					name='email'
					placeholder='example@zubayer.com'
					type="email"
					value={credentials.email}
					disableAutoComplete
					required
					error={error.email}
					inputClasses='bg-gray-100'
				/>

				<CommonInput
					change={handleChange}
					label='Password'
					name='password'
					placeholder='*******'
					type="password"
					value={credentials.password}
					required
					error={error.password}
					inputClasses='bg-gray-100'
				/>

				<CommonInput
					change={handleChange}
					label='Confirm Password'
					name='confirmPassword'
					placeholder='*******'
					type="password"
					value={credentials.confirmPassword}
					required
					error={error.password}
					inputClasses='bg-gray-100'
				/>

				<div className='mb-6'>
					<CommonSelect
						defSelectName="Select Role"
						required
						change={handleChange}
						value={credentials.role}
						label='Role'
						name='role'
						options={[{ id: 1, name: "user" }, { id: 2, name: "admin" }]}
						selectClasses='bg-gray-100'
						valueInName
					/>
				</div>

				<SubmitButton text='Create Account' />
			</form>

			<div className='flex items-center gap-2 text-sm'>
				<span>Already have an account?</span>
				<Link to={'/sign-in'} className='text-emerald-500 hover:underline'>
					Login Account
				</Link>
			</div>
		</CenterLayout>
	);
}
