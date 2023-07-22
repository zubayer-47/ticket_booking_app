import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/Context';
import {
	BusType,
	IdNameBrandLocationFromType,
	LocationType,
	ToType,
} from '../types/state.types';

import { IoTicketOutline } from 'react-icons/io5';
import api from '../utils/axios';
import { SubmitButton } from './Buttons/Button';
import { DateInput } from './Inputs/Inputs';
import Label from './Inputs/Label';
import CommonSelect from './Selects/CommonSelect';

interface ToListType {
	list: ToType[];
	loading: boolean;
	error: string;
}
interface FromListType {
	list: IdNameBrandLocationFromType[];
	loading: boolean;
	error: string;
}
interface BusesType {
	list: BusType[];
	loading: boolean;
	error: string;
}

export type BusObjType = {
	loading: boolean;
	locations: LocationType[];
	to: {
		loading: boolean;
		locations: LocationType[];
	};
	on: {
		from: string | null;
		to: string | null;
	};
};

export default function Booking() {
	const [busFormObj, setBusFormObj] = useState<BusObjType>({
		loading: true,
		locations: [],
		to: {
			loading: false,
			locations: [],
		},
		on: {
			from: null,
			to: null,
		},
	});

	const [error, setError] = useState<string | null>(null);

	const [toList, setToList] = useState<ToListType>({
		error: '',
		loading: false,
		list: [],
	});
	const [fromList, setFromList] = useState<FromListType>({
		error: '',
		loading: true,
		list: [],
	});
	const [buses, setBuses] = useState<BusesType>({
		error: '',
		loading: false,
		list: [],
	});
	const { dispatch } = useContext(Context);
	const navigate = useNavigate();

	// fetching from list inside useEffect
	useEffect(() => {
		const controller = new AbortController();

		(async () => {
			// setFromList((prev) => ({
			// 	...prev,
			// 	loading: true,
			// }));
			// dispatch({ type: "LOADING", payload: true })

			try {
				const res = await api.get(`/search/fromLocation`, {
					signal: controller.signal,
				});

				setBusFormObj((prev) => ({
					...prev,
					loading: false,
					locations: res.data?.location || [],
				}));

				// setFromList((prev) => ({
				// 	...prev,
				// 	list: res.data?.location,
				// 	// loading: false,
				// }));
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const message = error.response?.data?.message;

					// setFromList((prev) => ({
					// 	...prev,
					// 	error: message,
					// }));
					setError(message);
					return;
				}
				// setFromList((prev) => ({
				// 	...prev,
				// 	error: 'Something Went Wrong! Please Try Again.',
				// }));
				setError('Something Went Wrong! Please Try Again.');
			}
			// dispatch({ type: "LOADING", payload: false })
			// setFromList((prev) => ({
			// 	...prev,
			// 	loading: false,
			// }));
		})();

		return () => controller.abort();
	}, [dispatch]);

	// fetching destination (to)
	const getToBasedOnFrom = async (id: string) => {
		setBusFormObj((prev) => ({
			...prev,
			to: { ...prev.to, loading: true },
			on: { ...prev.on, from: id },
		}));

		try {
			const res = await api.get(`/search/toLocation/${id}`);

			setBusFormObj((prev) => ({
				...prev,
				to: { locations: res?.data || [], loading: false },
			}));

			// setToList((prev) => ({
			// 	...prev,
			// 	list: res.data,
			// }));
		} catch (error) {
			setBusFormObj((prev) => ({
				...prev,
				to: { locations: [], loading: false },
			}));

			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				// setToList((prev) => ({
				// 	...prev,
				// 	error: message,
				// }));
				setError(message);
				return;
			}

			// setToList((prev) => ({
			// 	...prev,
			// 	error: 'Something Went Wrong! Please Try Again.',
			// }));
			setError('Something Went Wrong! Please Try Again.');
		}
	};

	const handleInput = (id: string) =>
		setBusFormObj((prev) => ({ ...prev, on: { ...prev.on, to: id } }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setBuses((prev) => ({
			...prev,
			loading: true,
		}));
		const formData = new FormData(e.currentTarget);

		const body = {
			journeyDate: formData.get('date'),
			type: formData.get('type'),
		};

		if (!busFormObj.on.from || !busFormObj.on.to || !body.journeyDate || !body.type) {
			alert("All Fields are required!");
			return
		}

		const dateTime = String(body.journeyDate);
		const date = dayjs(dateTime);

		try {
			const res = await api.get('/search', {
				params: {
					fromId: busFormObj.on.from,
					toLocation: busFormObj.on.to,
					journey_date: date,
					type: body.type,
				},
			});

			setBuses((prev) => ({
				...prev,
				list: res.data,
			}));

			navigate('/ticket', { state: res.data })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				setBuses((prev) => ({
					...prev,
					error: message,
				}));
				return;
			}

			setBuses((prev) => ({
				...prev,
				error: 'Something Went Wrong! Please Try Again.',
			}));
		}

		setBuses((prev) => ({
			...prev,
			loading: false,
		}));
	};

	console.log(buses)

	return (
		<div>
			<div className='flex items-center gap-2 mb-3'>
				<IoTicketOutline className='w-6 h-6 text-emerald-500' />
				<h2 className='text-2xl font-medium text-emerald-500'>Buy Ticket</h2>
			</div>
			<div className='grid grid-cols-12 gap-5'>
				<form
					className='space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 lg:col-span-6'
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
							defSelectName='Choose Leaving From'
							label='Leaving From'
							name='from-loc'
							options={busFormObj.locations}
							change={(e) => getToBasedOnFrom(e.target.value)}
							value={busFormObj.on?.from + ''}
							required
							selectClasses='bg-white'
						/>

						<CommonSelect
							defSelectName='------'
							label='Going To'
							name='to'
							options={busFormObj.to.locations}
							change={(e) => handleInput(e.target.value)}
							value={busFormObj.on?.to + ''}
							required
							selectClasses='bg-white'
						/>

						{/* <Select name='to' label='Going To' state={toList} /> */}
					</div>
					<div className='flex justify-center items-center gap-2'>
						<div>
							<Label text='Journey Date' id='date' isRequired />
							<DateInput />
						</div>
						<select
							className='w-full bg-white p-3 rounded-md outline-none border-2 mt-5'
							name='type'
						>
							<option>----</option>
							<option value='AC'>AC</option>
							<option value='non_AC'>NON-AC</option>
						</select>
					</div>

					<div className='flex justify-end'>
						<SubmitButton text='Search Bus' />
					</div>
				</form>

				<div className='hidden md:col-span-6 lg:flex items-center'>
					<img
						className=''
						src='https://static.busbd.com.bd/busbdmedia/for%20salide.1500371408'
					/>
				</div>
			</div>
		</div>
	);
}
