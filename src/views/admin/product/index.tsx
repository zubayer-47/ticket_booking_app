import axios from 'axios';
import dayjs from 'dayjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BgNoneButton, SubmitButton } from '../../../components/Buttons/Button';
import Error from '../../../components/Error';
import CommonInput from '../../../components/Inputs/CommonInput';
import { DateInput } from '../../../components/Inputs/Inputs';
import CommonSelect from '../../../components/Selects/CommonSelect';
import { IdNameBrandLocationFromType, LocationType } from '../../../types/state.types';
import api from '../../../utils/axios';

export interface LocationsType {
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
        busId: string | null;
        destination: string | null;
    };
};

export default function CreateProduct() {
    const [product, setProduct] = useState<BusObjType>({
        loading: true,
        buses: [],
        destination: {
            loading: false,
            locations: [],
        },
        on: {
            busId: null,
            destination: null,
        },
    });

    const [error, setError] = useState('');

    const [locations, setLocations] = useState<LocationsType>({
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
            try {
                const res = await api.get('/brand/', { signal: controller.signal });

                setProduct(prev => ({
                    ...prev,
                    loading: false,
                    buses: res.data
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // const message = error.response?.data?.message;
                    // return;
                }
            }
        };

        getBrands();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

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

        getLocations();
        return () => controller.abort();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            journeyDate: formData.get('date'),
            type: formData.get('type'),
        };
        const dateTime = String(body.journeyDate);
        const date = dayjs(dateTime);

        console.log(product.on, 'create')

        try {
            await api.post('/product', {
                brandID: product.on.busId,
                location_id: product.on.destination,
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

    const handleInput = (id: string, name: string) => {
        if (name === 'bus') return setProduct((prev) => ({ ...prev, on: { ...prev.on, busId: id } }));

        else return setProduct((prev) => ({ ...prev, on: { ...prev.on, destination: id } }));
    }

    return (
        <>
            {error ? (<Error classNames='text-xl text-center block mb-5 font-bold' error={error} />) : null}
            <form
                className='max-w-xl mx-auto space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 md:col-span-6'
                onSubmit={handleSubmit}
            >
                <div>
                    <CommonSelect
                        defSelectName='Choose Bus'
                        label='Bus'
                        name='bus'
                        options={product.buses}
                        change={(e) => handleInput(e.target.value, e.target.name)}
                        value={product.on?.busId + ''}
                        required
                        selectClasses='bg-white'
                    />

                    <CommonSelect
                        defSelectName='------'
                        label='Going To'
                        name='to'
                        options={product.destination.locations}
                        change={(e) => handleInput(e.target.value, e.target.name)}
                        value={product.on?.destination + ''}
                        required
                        selectClasses='bg-white'
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

                    {/* from locations */}
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
                                        selectClasses='bg-white'
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
        </>

    );
}
