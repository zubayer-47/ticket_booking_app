import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../contexts/Context';
import { api } from '../utils/axios';
import { SubmitButton } from './Buttons/Button';
import { DateInput } from './Inputs/Inputs';
import Select from './common/Select';

export default function Booking() {
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { state, addFrom, removeFrom, removeTo, addTo, addBuses, removeBuses } = useContext(Context);

    useEffect(() => {
        const controller = new AbortController();

        const getAllFrom = async () => {
            try {
                const res = await api.get('/search/fromLocation', { signal: controller.signal });

                if (res.status === 200) {
                    // console.log(res.data?.location, 'add from list, booking.tsx')
                    addFrom(res.data?.location)
                }
            } catch (error) {
                removeFrom();
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setError(message)
                    return
                }
                setError('Something Went Wrong! Please Try Again.')
            }
        }

        getAllFrom()

        return () => controller.abort();
    }, [addFrom, removeFrom])

    // fetch destination (to)
    const getToBasedOnFrom = (id: string) => {
        const controller = new AbortController();

        const fetchTo = async () => {
            try {
                const res = await api.get(`/search/toLocation/${id}`, { signal: controller.signal });

                if (res.status === 200) {

                    addTo(res.data)
                }
            } catch (error) {
                removeTo();
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setError(message)
                    return
                }
                setError('Something Went Wrong! Please Try Again.')
            }
        }

        fetchTo()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            from: formData.get('from'),
            to: formData.get('to'),
            journeyDate: formData.get('date'),
            type: formData.get('type'),
        }
        body.from = String(body.from).split(' ')[1]
        body.to = String(body.to).split(' ')[1]

        console.log(body)

        const dateTime = String(body.journeyDate);
        const date = dayjs(dateTime);

        const controller = new AbortController();

        try {
            const res: Record<string, any> = await api.get('/search', {
                params: {
                    fromId: body.from,
                    toLocation: body.to,
                    journey_date: date,
                    type: body.type
                },
                signal: controller.signal
            })

            if (res.status === 200) {
                // console.log(res.data)
                addBuses(res.data);
            }

        } catch (error) {
            removeBuses();
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setError(message)
                return
            }
            setError('Something Went Wrong! Please Try Again.')
        }

        navigate('/ticket')
    }

    return (
        <div className='grid grid-cols-12 gap-5'>
            <form className='space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 md:col-span-6' onSubmit={handleSubmit}>
                <div>
                    <Select
                        name='from'
                        label="From"
                        state={state.from.list}
                        handleSelected={getToBasedOnFrom}
                    />

                    <Select
                        name='to'
                        label="To"
                        state={state.to}
                        empty='No Destination Exist'
                    />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div>
                        <label className='block' htmlFor="date">Journey Date</label>
                        <DateInput />
                    </div>
                    <select className='w-full bg-white p-2 rounded-md outline-none border-2 mt-6' name="type" >
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
