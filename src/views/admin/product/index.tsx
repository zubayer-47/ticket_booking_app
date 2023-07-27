import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../../components/Buttons/Button';
import Error from '../../../components/Error';
import { DateInput } from '../../../components/Inputs/Inputs';
import CommonSelect from '../../../components/Selects/CommonSelect';
import useFetchBrands from '../../../hooks/useFetchBrands';
import useFetchLocations from '../../../hooks/useFetchLocations';
import api from '../../../utils/axios';

export type BusObjType = {
    loading: boolean;
    on: {
        busId: string | null;
        destination: string | null;
    };
};

export default function CreateProduct() {
    const { locationsState } = useFetchLocations()
    const { brandsState } = useFetchBrands();
    const [product, setProduct] = useState<BusObjType>({
        loading: false,
        on: {
            busId: null,
            destination: null,
        },
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const body = {
            journeyDate: formData.get('date'),
            type: formData.get('type'),
        };
        const dateTime = String(body.journeyDate);
        const date = dayjs(dateTime);

        console.log(body.journeyDate)

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
                        options={brandsState.list}
                        change={(e) => handleInput(e.target.value, e.target.name)}
                        value={product.on?.busId + ''}
                        required
                        selectClasses='bg-white'
                    />

                    <CommonSelect
                        defSelectName='------'
                        label='Going To'
                        name='to'
                        options={locationsState.list}
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

                <div className='flex justify-end'>
                    <SubmitButton text='Create Destination' />
                </div>
            </form>
        </>

    );
}
