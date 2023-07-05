import { FiLifeBuoy } from 'react-icons/fi';

const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function BusSeats() {
    return (<div className='p-2'>
        <table className="border border-collapse ">
            <tr>
                <th className="w-20 border border-gray-300">Block</th>
                <th className="w-20 border border-gray-300">Available</th>
                <th className="w-20 border border-gray-300">Discount</th>
            </tr>
            <tr>
                <td className="bg-gray-600 h-2"></td>
                <td className="bg-white h-2"></td>
                <td className="bg-emerald-600 h-2"></td>
            </tr>
        </table>

        <div className="flex justify-between items-center mt-2 ">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </span>

            <span>
                <FiLifeBuoy className="w-8 h-8" />
            </span>
        </div>

        {/* seats */}
        <div className="grid gap-2 mt-5 ">
            {seats.map(() => (<div className="flex justify-between items-center gap-12">
                <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm">A1</button>
                    <button className="bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm">A2</button>
                </div>
                <div className="flex gap-2">
                    <button className="bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm">A1</button>
                    <button className="bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm">A2</button>
                </div>
            </div>))}
        </div>

    </div>
    )
}
