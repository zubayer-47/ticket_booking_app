import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import formateDate from '../utils/formateDate';
import { SubmitButton } from './Buttons/Button';
import Input from './Inputs/BookingInput';

export default function Booking() {
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            journeyDate: formData.get('date')
        }

        const dateTime = String(body.journeyDate);
        const date = formateDate(dateTime)

        // const res = await axios.post('/product', {
        //     brandID: "4ed2ca7f-4aca-421f-b9e7-eefa1605b7d8",
        //     journey_date: ""
        // })

        console.log({ date }, body.journeyDate)

        navigate('/ticket')
    }

    return (
        <div className='grid grid-cols-12 gap-5'>
            <form className='space-y-3 bg-gray-200/70 p-3 rounded-lg col-span-12 md:col-span-6' onSubmit={handleSubmit}>
                <div>
                    <label className='block' htmlFor="from">From</label>
                    <Input svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute border-r">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    } />
                </div>
                <div>
                    <label className='block' htmlFor="to">To</label>
                    <Input svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute border-r">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                    </svg>
                    } />
                </div>
                <div>
                    <label className='block' htmlFor="date">Journey Date</label>
                    <Input type='date' />
                </div>

                <SubmitButton text='Search' />
            </form>

            <div className='col-span-12 md:col-span-6 flex items-center'>
                <img className='' src='https://static.busbd.com.bd/busbdmedia/for%20salide.1500371408' />
            </div>
        </div>
    )
}
