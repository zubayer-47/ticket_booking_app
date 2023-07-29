import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { Context } from '../contexts/Context';
import {
	IdNameBrandLocationFromType
} from '../types/state.types';

import { IoTicketOutline } from 'react-icons/io5';
import useFilterDuplicateByObjName from '../hooks/useFilterDuplicateLocationsByObjName';
import api from '../utils/axios';
import BusList from './BusList';
import { SubmitButton } from './Buttons/Button';
import Error from './Error';
import { DateInput } from './Inputs/Inputs';
import Label from './Inputs/Label';
import CenterLayout from './Layouts/CenterLayout';
import PageLayout from './Layouts/PageLayout';
import CommonSelect from './Selects/CommonSelect';

export interface LocationsType extends IdNameBrandLocationFromType {
	fromID: string
}

export type BusObjType = {
	loading: boolean;
	locations: IdNameBrandLocationFromType[];
	to: {
		loading: boolean;
		locations: LocationsType[];
	};
	on: {
		from: string | null;
		to: string | null;
		type: string | null;
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
			type: null
		},
	});

	const { locations } = useFilterDuplicateByObjName(busFormObj.to.locations);

	const [error, setError] = useState<string | null>(null);
	const { dispatch, state } = useContext(Context);

	// fetching from list inside useEffect
	useEffect(() => {
		const controller = new AbortController();

		(async () => {
			dispatch({ type: "LOADING", payload: true })
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
			} finally {
				dispatch({ type: "LOADING", payload: false })
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

	const handleInput = (id: string, name: string) =>
		setBusFormObj((prev) => ({ ...prev, on: { ...prev.on, [name]: id } }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('getting');
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

			setBusFormObj(prev => ({
				...prev,
				prods: {
					status: 1,
					list: res.data,
					fromID: busFormObj.on.from,
				}
			}))

			dispatch({ type: "ADD_PRODS", payload: { list: res.data, fromID: busFormObj.on.from } })
			dispatch({ type: "ADD_PRODS_STATUS", payload: 1 })
		} catch (error) {
			dispatch({ type: "ADD_PRODS_STATUS", payload: null })

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
		<PageLayout>
			<CenterLayout noWidth>
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
								change={(e) => handleInput(e.target.value, e.target.name)}
								value={busFormObj.on?.to + ''}
								required
								selectClasses='bg-white'
							/>


							{/* <Select name='to' label='Going To' state={toList} /> */}
						</div>
						<div className='flex justify-between gap-2'>
							<div className='w-full space-y-1'>
								<Label text='Journey Date' id='date' isRequired />
								<DateInput />
							</div>

							<div className='mt-0.5 w-full'>
								<CommonSelect
									defSelectName='------'
									label='Type'
									name='type'
									options={[{ id: "AC", name: "AC" }, { id: "non_AC", name: "NON-AC" }]}
									change={(e) => handleInput(e.target.value, e.target.name)}
									value={busFormObj.on?.type + ''}
									required
									selectClasses='bg-white'
									classNames='w-full'
								/>
							</div>
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
			</CenterLayout>

			{!state.searchProds.status ? null : (
				<BusList />
			)}
		</PageLayout>
	);
}
