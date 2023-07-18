import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../../components/Buttons/Button';
import Error from '../../../components/Error';
import { DateInput } from '../../../components/Inputs/Inputs';
import Select from '../../../components/common/Select';
import { IdNameBrandLocationFromType } from '../../../types/state.types';
import { api } from '../../../utils/axios';

interface BrandsType {
    error: string;
    loading: boolean;
    list: IdNameBrandLocationFromType[]
}
interface locationsType {
    error: string;
    loading: boolean;
    list: IdNameBrandLocationFromType[]
}

export default function Create() {
    const [error, setError] = useState('')
    const [brands, setBrands] = useState<BrandsType>({ error: "", loading: false, list: [] })
    const [locations, setLocations] = useState<locationsType>({ error: "", loading: false, list: [] })
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();

        // fetch brands
        const getBrands = async () => {
            setBrands(prev => ({
                ...prev,
                loading: true
            }))
            try {
                const res = await api.get('/brand/', { signal: controller.signal });

                if (res.status === 200) {
                    // console.log(res.data, 'brands')
                    setBrands(prev => ({
                        ...prev,
                        list: res.data
                    }))
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setBrands(prev => ({
                        ...prev,
                        error: message
                    }))
                    return
                }
                setBrands(prev => ({
                    ...prev,
                    error: 'Something Went Wrong! Please Try Again.'
                }))
            }
            setBrands(prev => ({
                ...prev,
                loading: false
            }))
        }

        // fetch locations
        const getLocations = () => {
            const fetchTo = async () => {
                setLocations(prev => ({
                    ...prev,
                    loading: true
                }))
                try {
                    const res = await api.get('/location', { signal: controller.signal });

                    if (res.status === 200) {
                        setLocations(prev => ({
                            ...prev,
                            list: res.data
                        }))
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.message

                        setLocations(prev => ({
                            ...prev,
                            error: message
                        }))
                        return
                    }
                    setLocations(prev => ({
                        ...prev,
                        error: "Something Went Wrong! Please Try Again."
                    }))
                }
                setLocations(prev => ({
                    ...prev,
                    loading: false
                }))
            }

            fetchTo()
        }

        getBrands()
        getLocations();

        return () => controller.abort();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            brand: formData.get('brand'),
            location: formData.get('location'),
            journeyDate: formData.get('date'),
            type: formData.get('type'),
        }
        body.brand = String(body.brand).split(' ')[1]
        body.location = String(body.location).split(' ')[1]
        console.log(body)


        const dateTime = String(body.journeyDate);
        const date = dayjs(dateTime);

        try {
            const res = await api.post('/product', {
                brandID: body.brand,
                location_id: body.location,
                journey_date: date,
                type: body.type
            })

            console.log(res.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setError(message)
                return
            }
            setError('Something Went Wrong! Please Try Again.')
        }

        // navigate('/ticket')
    }

    return (
        <form className='space-y-3 bg-gray-200/70 p-3 rounded-lg max-w-xl mx-auto' onSubmit={handleSubmit}>
            <Select
                name='brand'
                label="Brand"
                state={brands}
                defaultOptionValue="Choose Brand"
            />

            <Select
                name='location'
                label="Location"
                state={locations}
                defaultOptionValue="Choose Location"
            />
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

            <SubmitButton text='Create' />

            <p className='text-center'>
                {!!error ? (<Error error={error} />) : null}
            </p>
        </form>
    )
}
