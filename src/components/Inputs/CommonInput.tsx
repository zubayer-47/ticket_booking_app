import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { InputHandlerType, InputHtmlType } from '../../types/custom';
import Error from '../Error';

type Props = {
	label: string;
	type: InputHtmlType;
	name: string;
	change: InputHandlerType;
	value: string | number;
	placeholder: string;
	disableAutoComplete?: boolean;
	required?: boolean;
	minMax?: number[];
	error?: string;
	isLoading?: boolean;
	classNames?: string;
	inputClasses?: string
};

const CommonInput: React.FC<Props> = ({
	label,
	type,
	name,
	change,
	value,
	minMax,
	disableAutoComplete,
	placeholder,
	required,
	error,
	isLoading,
	classNames,
	inputClasses
}) => {
	const [show, setShow] = useState(false);

	const onVisible = () => setShow((prev) => !prev);

	return (
		<div className={`mb-3 ${classNames || ''}`}>
			{label && (
				<label
					htmlFor={name}
					className='w-full flex items-center gap-0.5 text-xs md:text-md font-bold tracking-wider px-1 text-gray-600'
				>
					<span>{label}</span>
					{required ? (
						<span className='text-base font-bold text-red-400'>*</span>
					) : null}
				</label>
			)}
			{minMax ? (
				<input
					type={type}
					name={name}
					className={`w-full mt-1 p-3 text-sm outline-none rounded-lg tracking-wide ${error ? 'text-red-400' : ''
						} ${inputClasses || ""}`}
					onChange={change}
					value={value || ''}
					min={minMax[0] || 0}
					max={minMax[1] || 0}
					step={10}
					autoComplete='off'
					id={name}
					placeholder={placeholder}
					disabled={isLoading}
				/>
			) : type === 'password' ? (
				<div className="relative">
					<input
						type={show ? "text" : 'password'}
						name={name}
						className={`w-full mt-1 px-3.5 py-3.5 text-sm outline-none rounded-lg tracking-wide ${error ? 'text-red-400' : ''
							} ${inputClasses || ""}`}
						onChange={change}
						value={value || ''}
						id={name}
						placeholder={placeholder}
						autoComplete={disableAutoComplete ? 'off' : 'on'}
						disabled={isLoading}
					/>

					{!value ? null : (
						<button
							type='button'
							className='p-2 absolute right-0 top-3'
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
			) : (
				<input
					type={type}
					name={name}
					className={`w-full mt-1 px-3.5 py-3.5 text-sm outline-none rounded-lg tracking-wide ${error ? 'text-red-400' : ''
						} ${inputClasses || ""}`}
					onChange={change}
					value={value || ''}
					id={name}
					placeholder={placeholder}
					autoComplete={disableAutoComplete ? 'off' : 'on'}
					disabled={isLoading}
				/>)}

			{!!error && <Error error={error} />}
		</div>
	)
};

export default CommonInput;
