import { FaSadTear } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='w-full mx-3 md:mx-0 sm:w-3/5 md:max-w-md lg:max-w-lg p-4 bg-transparent rounded-xl select-none'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='flex justify-center items-center text-9xl gap-10'>4 <FaSadTear className="w-24 h-24 text-emerald-500" /> 4</p>
                    <p className='mt-10 text-lg text-gray-800'>Page Not Found</p>
                    <p className='text-md text-gray-600'>Something Went Wrong</p>

                    <div className='relative flex flex-col justify-center mt-5'>
                        <IoIosArrowBack className="absolute text-gray-50 text-lg" />
                        <Link to='/' className='py-2 px-4 rounded-md bg-emerald-500 text-white hover:bg-emerald-600'>Go Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
