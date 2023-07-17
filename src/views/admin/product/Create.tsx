import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../../components/Buttons/Button';
import { DateInput } from '../../../components/Inputs/Inputs';
import Select from '../../../components/common/Select';
import { Context } from '../../../contexts/Context';
import { api } from '../../../utils/axios';

export default function Booking() {
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        const controller = new AbortController();

        const getAllFrom = async () => {
            try {
                const res = await api.get('/search/fromLocation', { signal: controller.signal });

                if (res.status === 200) {
                    // console.log(res.data?.location, 'add from list, booking.tsx')
                    dispatch({ type: "ADD_FROM", payload: res.data?.location });
                }
            } catch (error) {
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
    }, [dispatch])

    // fetch destination (to)
    const getToBasedOnFrom = (id: string) => {
        const fetchTo = async () => {
            try {
                const res = await api.get(`/search/toLocation/${id}`);

                if (res.status === 200) {
                    dispatch({ type: "ADD_TO", payload: res.data });
                }
            } catch (error) {
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

            // console.log(res.data)
            dispatch({ type: "ADD_BUSES", payload: res.data });

        } catch (error) {
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
