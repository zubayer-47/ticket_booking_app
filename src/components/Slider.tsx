import Input from './common/Input'
import './slider.css'
export default function Slider() {
    return (
        <div className="relative bg-green-300 h-96">
            <img id='img' className="w-full h-full absolute bg-no-repeat bg-cover bg-blend-overlay bg-black/40" alt="" />

            <div className='absolute top-1/4 right-0 p-4 bg-green-100 rounded-lg mr-3'>
                <form className='space-y-3 bg-gray-50 p-3 rounded-lg'>
                    <div>
                        <label className='block' htmlFor="from">From</label>
                        <Input id='from' svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute border-r">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                        } />
                    </div>
                    <div>
                        <label className='block' htmlFor="to">To</label>
                        <Input id='to' svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute border-r">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
                        </svg>
                        } />
                    </div>
                    <div>
                        <label className='block' htmlFor="date">Journey Date</label>
                        <Input type='date' id='to' />
                    </div>
                </form>
            </div>
        </div>
    )
}
