import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './common/Input';

export default function Booking() {
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate('/ticket')
    }

    return (
        <div className='grid grid-cols-12 gap-5'>
            <form className='space-y-3 bg-gray-100 p-3 rounded-lg col-span-6' onSubmit={handleSubmit}>
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

                <button type='submit' className='py-2 px-4 rounded-md bg-emerald-500 text-white hover:bg-emerald-600'>Search</button>
            </form>

            <div className='col-span-6 flex items-center'>
                <img className='' src='https://static.busbd.com.bd/busbdmedia/for%20salide.1500371408' />
            </div>
        </div>
    )
}
