import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BusType, IdNameBrandLocationFromType, ToType } from '../types/state.types';
import { api } from '../utils/axios';
import { SubmitButton } from './Buttons/Button';
import { DateInput } from './Inputs/Inputs';
import Select from './common/Select';

interface ToListType {
    list: ToType[],
    loading: boolean;
    error: string;
}
interface FromListType {
    list: IdNameBrandLocationFromType[],
    loading: boolean;
    error: string;
}
interface BusesType {
    list: BusType[],
    loading: boolean;
    error: string;
}

export default function Booking() {
    const [toList, setToList] = useState<ToListType>({ error: "", loading: false, list: [] });
    const [fromList, setFromList] = useState<FromListType>({ error: '', loading: false, list: [] });
    const [buses, setBuses] = useState<BusesType>({ error: "", loading: false, list: [] });
    const navigate = useNavigate();

    // fetching from list inside useEffect
    useEffect(() => {
        const controller = new AbortController();

        const getAllFrom = async () => {
            setFromList(prev => ({
                ...prev,
                loading: true
            }))

            try {
                const res = await api.get('/search/fromLocation', { signal: controller.signal });

                if (res.status === 200) {
                    setFromList(prev => ({
                        ...prev,
                        list: res.data?.location
                    }))
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setFromList(prev => ({
                        ...prev,
                        error: message
                    }))
                    return
                }
                setFromList(prev => ({
                    ...prev,
                    error: 'Something Went Wrong! Please Try Again.'
                }))
            }

            setFromList(prev => ({
                ...prev,
                loading: false
            }))
        }
        getAllFrom()

        return () => controller.abort();
    }, [])

    // fetching destination (to)
    const getToBasedOnFrom = (id: string) => {
        const fetchTo = async () => {
            setToList(prev => ({
                ...prev,
                loading: true
            }))
            try {
                const res = await api.get(`/search/toLocation/${id}`);

                if (res.status === 200) {
                    setToList(prev => ({
                        ...prev,
                        list: res.data,
                    }));
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setToList(prev => ({
                        ...prev,
                        error: message
                    }))
                    return
                }

                setToList(prev => ({
                    ...prev,
                    error: 'Something Went Wrong! Please Try Again.'
                }))
            }
            setToList(prev => ({
                ...prev,
                loading: false
            }))
        }
        fetchTo()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setBuses(prev => ({
            ...prev,
            loading: true
        }))
        const formData = new FormData(e.currentTarget);

        const body = {
            from: formData.get('from'),
            to: formData.get('to'),
            journeyDate: formData.get('date'),
            type: formData.get('type'),
        }
        body.from = String(body.from).split(' ')[1]
        body.to = String(body.to).split(' ')[1]

        if (!body.from || !body.to || !body.journeyDate || !body.type) {
            alert("All Fields are required!");
            return
        }

        const dateTime = String(body.journeyDate);
        const date = dayjs(dateTime);

        try {
            const res = await api.get('/search', {
                params: {
                    fromId: body.from,
                    toLocation: body.to,
                    journey_date: date,
                    type: body.type
                }
            })

            setBuses(prev => ({
                ...prev,
                list: res.data
            }))

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setBuses(prev => ({
                    ...prev,
                    error: message
                }))
                return
            }

            setBuses(prev => ({
                ...prev,
                error: 'Something Went Wrong! Please Try Again.'
            }))
        }

        setBuses(prev => ({
            ...prev,
            loading: false
        }))

        navigate('/ticket')
    }

    return (
        <div className='grid grid-cols-12 gap-5'>
            <form className='space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 md:col-span-6' onSubmit={handleSubmit}>
                <div>
                    <Select
                        name='from'
                        label="From"
                        state={fromList}
                        handleSelected={getToBasedOnFrom}
                    />

                    <Select
                        name='to'
                        label="To"
                        state={toList}
                    />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div>
                        <label className='block' htmlFor="date">Journey Date</label>
                        <DateInput />
                    </div>
                    <select className='w-full bg-white p-2 rounded-md outline-none border-2 mt-6' name="type" value='' onChange={() => undefined}>
                        <option>---</option>
                        <option value="AC">AC</option>
                        <option value="non_AC">NON-AC</option>
                    </select>
                </div>

                <SubmitButton text='Search' />
            </form>

            <div className='col-span-12 md:col-span-6 flex items-center'>
                <img className='' src='https://static.busbd.com.bd/busbdmedia/for%20salide.1500371408' />
            </div>
        </div>
    )
}
