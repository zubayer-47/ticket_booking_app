/* eslint-disable no-extra-boolean-cast */
import { useRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { InputHandlerType, InputType } from '../../types/custom';
import { InputError } from '../Error';
import Label from './Label';

type InputProps = {
	label?: string;
	name: string;
	id?: string;
	isRequired?: boolean;
	placeholder?: string;
	type?: string;
	defaultSize?: boolean;
	error?: string;
	disabled?: boolean;
	brandRef?: React.RefObject<HTMLInputElement>;
	classNames?: string;
	defVale?: number;
};

export default function Input({
	label = '',
	name,
	type = 'text',
	placeholder,
	id = '',
	isRequired = false,
	defaultSize = false,
	error,
	disabled = false,
	brandRef,
	classNames,
	defVale,
}: InputProps) {
	const [value, setValue] = useState(defVale || '');

	const handleChange = (e: InputType) => {
		setValue(e.target.value);
	};

	return (
		<div className={`w-full ${classNames || ''}`}>
			<Label text={label} id={id} isRequired={isRequired} />

			<input
				ref={brandRef}
				type={type}
				placeholder={placeholder}
				id={id}
				name={name}
				className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:outline-none block w-full ${!error?.length ? 'focus:ring-blue-500 focus:border-blue-500' : ''
					} ${!error?.length ? 'border-gray-400' : 'border-red-400'} ${!defaultSize ? 'p-1' : 'p-2'
					} `}
				autoComplete='off'
				value={value}
				onChange={handleChange}
				required={isRequired}
				disabled={disabled}
			/>
			{error && <InputError error={error} />}
		</div>
	);
}

type CheckBoxProps = {
	name: string;
	to: string;
	linkText: string;
	text: string;
	isAgree: boolean;
	handler: InputHandlerType
};

export function CheckBox({ name, to, text, linkText, isAgree, handler }: CheckBoxProps) {
	return (
		<div className='flex justify-center items-center gap-1'>
			<input
				type='checkbox'
				name={name}
				checked={isAgree}
				onChange={handler}
				required
			/>
			<span className='text-xs'>
				{text}{' '}
				<Link to={to} className='text-blue-700 font-bold'>
					{linkText}
				</Link>
			</span>
		</div>
	);
}

type PasswordInputProps = {
	id?: string;
	text?: string;
	error?: string;
};

export function PasswordInput({
	text = 'Password',
	id = 'password',
	error = '',
}: PasswordInputProps) {
	const [show, setShow] = useState(false);
	const [value, setValue] = useState('');

	const onVisible = () => setShow((prev) => !prev);

	const handleChange = (e: InputType) => {
		setValue(e.target.value);
	};

	return (
		<div>
			<Label id={id} text={text} isRequired />
			<div className='relative'>
				<input
					type={show ? 'text' : 'password'}
					name={id}
					id={id}
					onChange={handleChange}
					value={value || ''}
					placeholder='*********'
					className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${!!error?.length ? 'border-red-400' : 'border-gray-300'
						}`}
					autoComplete='off'
				/>
				{!value ? null : (
					<button
						type='button'
						className='p-2 absolute right-0 top-0'
						onClick={onVisible}
					>
						{show ? (
							<FiEyeOff className='w-5 h-5 stroke-1 text-indigo-300' />
						) : (
							<FiEye className='w-5 h-5 stroke-1 text-indigo-300' />
						)}
					</button>
				)}
			</div>
			{error && <InputError error={error} />}
		</div>
	);
}

export function DateInput() {
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	// function padTo2Digits(num: number) {
	// 	return num.toString().padStart(2, '0');
	// }

	// function formatDate(date = new Date()) {
	// 	return [
	// 		date.getFullYear(),
	// 		padTo2Digits(date.getMonth() + 1),
	// 		padTo2Digits(date.getDate()),
	// 	].join('-');
	// }

	// useEffect(() => {
	// 	if (Object.prototype.hasOwnProperty.call(inputRef.current, 'value')) {
	// 		console.log('ss')
	// 		inputRef.current?.valueAsDate = new Date();
	// 	}
	// }, [])

	return (
		<input
			type='date'
			ref={inputRef}
			className='w-full tracking-widest border outline-none rounded-md p-2.5'
			name='date'
			id='date'
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}
