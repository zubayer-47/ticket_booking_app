import axios from 'axios';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../../components/Buttons/Button';
import { Context } from '../../../contexts/Context';
import { api } from '../../../utils/axios';
import formateDate from '../../../utils/formateDate';


// handle errors
export default function Create() {
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { state, addFrom, removeFrom, addTo, removeTo } = useContext(Context);

    useEffect(() => {
        const controller = new AbortController();

        const getAllFrom = async () => {
            try {
                const res = await api.get('/search/fromLocation', { signal: controller.signal });

                if (res.status === 200) {
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

    const getToBasedOnFrom = () => {

        const fetchTo = async () => {
            try {
                // const res = await api.get(`/search/toLocation/${selectedFromId}`);

                // if (res.status === 200) {
                //     addTo(res.data)
                // }
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

        const dateTime = String(body.journeyDate);
        const date = formateDate(dateTime)

        try {
            // const res = await api.get('/search', {
            //     params: {
            //         fromId: body.from,
            //         toLocation: body.to,
            //         journey_date: date,
            //         type: body.type
            //     }
            // })

            // if (res.status === 200) {
            //     console.log(res.data)
            // }

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
        <div className=''>
            <form className='space-y-3 bg-gray-200/70 p-3 rounded-lg' onSubmit={handleSubmit}>
                <div>
                    <Input

                        name='buses' />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <div>
                        <label className='block' htmlFor="date">Journey Date</label>
                        <Input type='date' />
                    </div>
                    <select className='w-full bg-white p-2 rounded-md outline-none border-2 mt-6' name="type" >
                        <option>---</option>
                        <option value="AC">AC</option>
                        <option value="NON-AC">NON-AC</option>
                    </select>
                </div>

                <SubmitButton text='Create' />
            </form>
        </div>
    )
}
