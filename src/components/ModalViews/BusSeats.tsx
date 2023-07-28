import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiLifeBuoy } from 'react-icons/fi';
import useFilterDuplicateSeats from '../../hooks/useFilterDuplicateSeats';
import { TicketType } from '../../types/state.types';
import api from '../../utils/axios';
import filterTwoArr from '../../utils/filterTwoArr';

const seat2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function BusSeats({ prodID }: { prodID: string }) {
    const [seats, setSeats] = useState<TicketType[]>([])
    const { seats: filteredSeats } = useFilterDuplicateSeats(seats);

    const demo = filterTwoArr()
    console.log(demo)

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const res = await api.get(`/ticket/${prodID}`, { signal: controller.signal });

                setSeats(res.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // const message = error.response?.data?.message || error.response?.data;
                    // return;
                }
            }
        })();

        return () => controller.abort()
    }, [prodID]);

    return (<div className='p-2'>
        <table className="border border-collapse w-full">
            <thead>
                <tr>
                    <th className="w-20 border border-gray-300">Block</th>
                    <th className="w-20 border border-gray-300">Available</th>
                    <th className="w-20 border border-gray-300">Discount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="bg-gray-600 h-2"></td>
                    <td className="bg-white h-2"></td>
                    <td className="bg-emerald-600 h-2"></td>
                </tr>
            </tbody>
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
        <div className="grid grid-cols-bus_seats gap-2 mt-5 w-full overflow-auto">
            {seat2.map((v) => (<div className="flex justify-between items-center gap-5 lg:gap-12" key={v}>
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
