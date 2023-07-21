import { SelectHandler } from '../../types/custom';
import Error from '../Error';

type Props = {
	label: string;
	name: string;
	change: SelectHandler;
	defSelectName: string | number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options: any[];
	value?: string;
	isLoading?: boolean;
	required?: boolean;
	error?: string;
	classNames?: string;
};

const CommonSelect: React.FC<Props> = ({
	label,
	name,
	change,
	defSelectName,
	value,
	options,
	required,
	classNames,
	error,
	isLoading,
}) => (
	<div className={`mb-3 ${classNames || ''}`}>
		{label && (
			<label
				htmlFor={name}
				className='w-full flex items-center text-xs md:text-md font-bold tracking-wider px-1 text-gray-600'
			>
				<span>{label}</span>
				{required ? (
					<span className='ml-0.5 -my-2 text-base font-bold text-red-400'>
						*
					</span>
				) : null}
			</label>
		)}
		<select
			name={name}
			id={name}
			className={`w-full mt-1 p-3 text-sm outline-none rounded-lg tracking-wide ${
				error ? 'text-red-400' : ''
			}`}
			onChange={change}
			value={value || ''}
			disabled={isLoading}
		>
			<option value=''>{defSelectName}</option>
			{options &&
				options.map((opt) => (
					<option key={opt.id} value={opt.id}>
						{opt.name}
					</option>
				))}
		</select>
		{!!error && <Error error={error} />}
	</div>
);
export default CommonSelect;
