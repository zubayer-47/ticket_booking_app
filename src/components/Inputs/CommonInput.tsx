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
}) => (
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
				className={`w-full mt-1 p-3 text-sm outline-none rounded-lg tracking-wide ${
					error ? 'text-red-400' : ''
				}`}
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
		) : (
			<input
				type={type}
				name={name}
				className={`w-full mt-1 px-3.5 py-3.5 text-sm outline-none rounded-lg tracking-wide ${
					error ? 'text-red-400' : ''
				}`}
				onChange={change}
				value={value || ''}
				id={name}
				placeholder={placeholder}
				autoComplete={disableAutoComplete ? 'off' : 'on'}
				disabled={isLoading}
			/>
		)}
		{!!error && <Error error={error} />}
	</div>
);

export default CommonInput;
