import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/Context';
import {
	LocationType
} from '../types/state.types';

import { IoTicketOutline } from 'react-icons/io5';
import useFilterDuplicateByObjName from '../hooks/useFilterDuplicateByObjName';
import api from '../utils/axios';
import { SubmitButton } from './Buttons/Button';
import Error from './Error';
import { DateInput } from './Inputs/Inputs';
import Label from './Inputs/Label';
import CommonSelect from './Selects/CommonSelect';

export interface LocationsType extends LocationType {
	fromID: string
}

export type BusObjType = {
	loading: boolean;
	locations: LocationType[];
	to: {
		loading: boolean;
		locations: LocationsType[];
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
			from: '',
			to: null,
		},
	});

	const { locations } = useFilterDuplicateByObjName(busFormObj.to.locations);

	const [error, setError] = useState<string | null>(null);

	const { dispatch } = useContext(Context);
	const navigate = useNavigate();

	// fetching from list inside useEffect
	useEffect(() => {
		const controller = new AbortController();

		(async () => {
			try {
				const res = await api.get(`/search/fromLocation`, {
					signal: controller.signal,
				});

				setBusFormObj((prev) => ({
					...prev,
					loading: false,
					locations: res.data?.location || [],
				}));
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const message = error.response?.data?.message;

					setError(message);
					return;
				}
				setError('Something Went Wrong! Please Try Again.');
			}
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
		} catch (error) {
			setBusFormObj((prev) => ({
				...prev,
				to: { locations: [], loading: false },
			}));

			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.message;

				setError(message);
				return;
			}

			setError('Something Went Wrong! Please Try Again.');
		}
	};

	const handleInput = (id: string) =>
		setBusFormObj((prev) => ({ ...prev, on: { ...prev.on, to: id } }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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

			navigate('/ticket', { state: { prodList: res.data, from: busFormObj.on.from } })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// const message = error.response?.data?.message;
				// return;
			}
		}
	};

	useEffect(() => {
		const filteredToLocations = busFormObj.to.locations.filter((value) => value.id !== busFormObj.on.from);

		setBusFormObj(prev => ({
			...prev,
			to: {
				loading: false,
				locations: filteredToLocations
			}
		}))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [busFormObj.to.locations.length]);

	return (
		<div>
			<div className='flex items-center gap-2 mb-3'>
				<IoTicketOutline className='w-6 h-6 text-emerald-500' />
				<h2 className='text-2xl font-medium text-emerald-500'>Buy Ticket</h2>
			</div>
			{error ? (<Error classNames='text-xl text-center block mb-5 font-bold' error={error} />) : null}
			<div className='grid grid-cols-12 gap-5'>
				<form
					className='space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 lg:col-span-6'
					onSubmit={handleSubmit}
				>
					<div>
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
							options={locations}
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
