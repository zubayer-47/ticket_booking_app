import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BgNoneButton, SubmitButton } from '../../../components/Buttons/Button';
import CommonInput from '../../../components/Inputs/CommonInput';
import CommonSelect from '../../../components/Inputs/CommonSelect';
import { DateInput } from '../../../components/Inputs/Inputs';
import { IdNameBrandLocationFromType, LocationType } from '../../../types/state.types';
import api from '../../../utils/axios';

interface BrandsType {
	error: string;
	loading: boolean;
	list: IdNameBrandLocationFromType[];
}
interface locationsType {
	error: string;
	loading: boolean;
	list: IdNameBrandLocationFromType[];
}

export interface FromStateType {
	id: string;
	location: string;
	price: number;
}

export type BusObjType = {
	loading: boolean;
	buses: LocationType[];
	destination: {
		loading: boolean;
		locations: LocationType[];
	};
	on: {
		busName: string | null;
		destination: string | null;
	};
};

// { location: "6da40a87-1abc-41e2-95d1-6cf961494bbb", price: 500, identifier:  },
//         { location: "29e0fa71-4add-4153-99e4-184a13c56f78", price: 500 },
//         { location: "2e29cf14-1101-4f49-8c5f-a5e3b6d4dab4", price: 500 },

export default function Create() {
	const [product, setProduct] = useState<BusObjType>({
		loading: true,
		buses: [],
		destination: {
			loading: false,
			locations: [],
		},
		on: {
			busName: null,
			destination: null,
		},
	});

	const [error, setError] = useState('');
	// const [value, setValue] = useState("");
	const [brands, setBrands] = useState<BrandsType>({
		error: '',
		loading: false,
		list: [],
	});
	const [locations, setLocations] = useState<locationsType>({
		error: '',
		loading: false,
		list: [],
	});
	const [froms, setFroms] = useState<FromStateType[]>([]);
	// const [fromModalOpen, setFromModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const controller = new AbortController();

		// fetch brands
		const getBrands = async () => {
			// setBrands((prev) => ({
			// 	...prev,
			// 	loading: true,
			// }));
			try {
				const res = await api.get('/brand/', { signal: controller.signal });

				setProduct(prev => ({
					...prev,
					loading: false,
					buses: res.data
				}))

				setBrands((prev) => ({
					...prev,
					list: res.data,
				}));
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const message = error.response?.data?.message;

					setBrands((prev) => ({
						...prev,
						error: message,
					}));
					return;
				}
				setBrands((prev) => ({
					...prev,
					error: 'Something Went Wrong! Please Try Again.',
				}));
			}
			setBrands((prev) => ({
				...prev,
				loading: false,
			}));
		};

		// fetch locations
		const getLocations = () => {
			const fetchTo = async () => {
				setLocations((prev) => ({
					...prev,
					loading: true,
				}));
				try {
					const res = await api.get('/location', { signal: controller.signal });

					setProduct(prev => ({
						...prev,
						loading: false,
						destination: {
							loading: false,
							locations: res.data
						},
					}))

					setLocations((prev) => ({
						...prev,
						list: res.data,
					}));
				} catch (error) {
					if (axios.isAxiosError(error)) {
						const message = error.response?.data?.message;

						setLocations((prev) => ({
							...prev,
							error: message,
						}));
						return;
					}
					setLocations((prev) => ({
						...prev,
						error: 'Something Went Wrong! Please Try Again.',
					}));
				}
				setLocations((prev) => ({
					...prev,
					loading: false,
				}));
			};

			fetchTo();
		};

		getBrands();
		getLocations();

		return () => controller.abort();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const body = {
			brand: formData.get('bus'),
			location: formData.get('location'),
			journeyDate: formData.get('date'),
			type: formData.get('type'),
		};
		body.brand = String(body.brand).split(' ')[1];
		body.location = String(body.location).split(' ')[1];
		console.log(body);

		const dateTime = String(body.journeyDate);
		const date = dayjs(dateTime);

		try {
			const res = await api.post('/product', {
				brandID: body.brand,
				location_id: body.location,
				journey_date: date,
				type: body.type,
			});

			navigate('/');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				setError(message);
				return;
			}
			setError('Something Went Wrong! Please Try Again.');
		}

		// navigate('/ticket')
	};

	const createFromLocations = () => {
		// set froms
		const id = uuidv4();
		setFroms((prev) => [...prev, { id, location: '', price: 0 }]);
	};

	const deleteFromLocations = (id: string) =>
		setFroms((prev) => prev.filter((v) => v.id !== id));

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
		id: string
	) => {
		setFroms((prev) => {
			const { name, value } = e.target;
			// console.log('name, value :', name, value);
			const clone = [...prev];
			const indexPos = clone.findIndex((v) => v.id === id);

			if (name === 'from-loc') {
				console.log(value)
				clone[indexPos].location = value
			}
			if (name === 'price') clone[indexPos].price = +value;
			return clone;
		});
	};

	const handleInput = (id: string) =>
		setProduct((prev) => ({ ...prev, on: { ...prev.on, destination: id } }));

	// console.log(froms)

	return (
		<form
			className='max-w-xl mx-auto space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 md:col-span-6'
			onSubmit={handleSubmit}
		>
			<div>
				{/* <Select
						name='from'
						label='Leaving From'
						state={fromList}
						handleSelected={getToBasedOnFrom}
					/> */}

				<CommonSelect
					defSelectName='Choose Bus'
					label='Bus'
					name='bus'
					options={product.buses}
					change={(e) => console.log(e.target.value)}
					value={product.on?.busName + ''}
					required
				/>

				<CommonSelect
					defSelectName='------'
					label='Going To'
					name='to'
					options={product.destination.locations}
					change={(e) => handleInput(e.target.value)}
					value={product.on?.destination + ''}
					required
				/>

				{/* <Select name='to' label='Going To' state={toList} /> */}
			</div>
			<div className='flex justify-center items-center gap-2'>
				<div>
					<label className='block' htmlFor='date'>
						Journey Date
					</label>
					<DateInput />
				</div>
				<select
					className='w-full bg-white p-3 rounded-md outline-none border-2 mt-6'
					name='type'
				>
					<option>----</option>
					<option value='AC'>AC</option>
					<option value='non_AC'>NON-AC</option>
				</select>
			</div>

			<div className='mb-8 mt-3'>
				<BgNoneButton
					text='Add From Locations'
					handler={createFromLocations}
					classNames='border border-emerald-600 px-5 text-emerald-600 mb-2'
				/>

				<div className='flex flex-col'>
					{froms.map((from) => {
						const filteredList = locations.list.filter(
							(l) => !froms.map((f) => f.location).includes(l.id)
						);

						// console.log('filteredList :', filteredList);
						// console.log('from.location :', from.location);
						return (
							<div key={from.id} className='flex items-center gap-2'>
								<CommonSelect
									defSelectName='Choose Location'
									label='From Locations'
									name='from-loc'
									options={filteredList}
									change={(e) => {
										handleChange(e, from.id);
									}}
									value={from.location}
									classNames='flex-1'
								/>

								<CommonInput
									label='Ticket Price'
									type='number'
									name='price'
									minMax={[0, 2000]}
									change={(e) => {
										handleChange(e, from.id);
									}}
									value={from.price}
									placeholder='Ticket Price'
									classNames='flex-1'
								/>

								<div className='flex items-stretch gap-1 mt-2'>
									<button
										onClick={() => deleteFromLocations(from.id)}
										type='button'
										className='p-2 rounded-md bg-red-500/25'
									>
										<FiTrash2 className='h-5 w-5 text-red-400' />
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className='flex justify-end'>
				<SubmitButton text='Create Destination' />
			</div>
		</form>
	);

	// return (
	// 	<form
	// 		className='bg-gray-200/70 p-3 rounded-lg max-w-xl mx-auto'
	// 		onSubmit={handleSubmit}
	// 	>
	// 		<Select
	// 			name='bus'
	// 			label='Bus'
	// 			state={brands}
	// 			defaultOptionValue='Choose Brand'
	// 		/>

	// 		<Select
	// 			name='location'
	// 			label='Location'
	// 			state={locations}
	// 			defaultOptionValue='Choose Location'
	// 		/>
	// 		{/* <FromSelect /> */}

	// 		<div className='flex justify-center items-center gap-2'>
	// 			<div>
	// 				<label className='block' htmlFor='date'>
	// 					Journey Date
	// 				</label>
	// 				<DateInput />
	// 			</div>
	// 			<select
	// 				className='w-full bg-white p-2 rounded-md outline-none border-2 mt-6'
	// 				name='type'
	// 			>
	// 				<option>---</option>
	// 				<option value='AC'>AC</option>
	// 				<option value='non_AC'>NON-AC</option>
	// 			</select>
	// 		</div>

	// 		<div className='mb-8 mt-3'>
	// 			<BgNoneButton
	// 				text='Add From Locations'
	// 				handler={createFromLocations}
	// 				classNames='border border-emerald-600 px-5 text-emerald-600 mb-2'
	// 			/>

	// 			<div className='flex flex-col'>
	// 				{froms.map((from) => {
	// 					const filteredList = locations.list.filter(
	// 						(l) => !froms.map((f) => f.location).includes(l.id)
	// 					);
	// 					// console.log('filteredList :', filteredList);
	// 					// console.log('from.location :', from.location);
	// 					return (
	// 						<div key={from.id} className='flex items-center gap-2'>
	// 							<CommonSelect
	// 								defSelectName='Choose Location'
	// 								label='From Locations'
	// 								name='from-loc'
	// 								options={filteredList}
	// 								change={(e) => {
	// 									handleChange(e, from.id);
	// 								}}
	// 								value={from.location}
	// 								classNames='flex-1'
	// 							/>

	// 							<CommonInput
	// 								label='Ticket Price'
	// 								type='number'
	// 								name='price'
	// 								minMax={[0, 2000]}
	// 								change={(e) => {
	// 									handleChange(e, from.id);
	// 								}}
	// 								value={from.price}
	// 								placeholder='Ticket Price'
	// 								classNames='flex-1'
	// 							/>

	// 							<div className='flex items-stretch gap-1 mt-2'>
	// 								<button
	// 									onClick={() => deleteFromLocations(from.id)}
	// 									type='button'
	// 									className='p-2 rounded-md bg-red-500/25'
	// 								>
	// 									<FiTrash2 className='h-5 w-5 text-red-400' />
	// 								</button>
	// 							</div>
	// 						</div>
	// 					);
	// 				})}
	// 			</div>
	// 		</div>

	// 		<SubmitButton text='Create Coach' />

	// 		<p className='text-center'>{!!error ? <Error error={error} /> : null}</p>
	// 	</form>
	// );
}
