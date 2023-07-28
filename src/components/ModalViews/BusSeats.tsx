import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiLifeBuoy } from 'react-icons/fi';
import { v4 } from 'uuid';
import { TicketType } from '../../types/state.types';
import api from '../../utils/axios';
import filterTwoDArr from '../../utils/filterTwoDArr';

const demoSeats: TicketType[][] = [
    [{ id: "1", seatName: "A1" }, { id: "2", seatName: "A2" }, { id: "3", seatName: "A3" }, { id: "4", seatName: "A4" }],
    [{ id: "1", seatName: "B1" }, { id: "2", seatName: "B2" }, { id: "3", seatName: "B3" }, { id: "4", seatName: "B4" }],
    [{ id: "1", seatName: "C1" }, { id: "2", seatName: "C2" }, { id: "3", seatName: "C3" }, { id: "4", seatName: "C4" }],
    [{ id: "1", seatName: "D1" }, { id: "2", seatName: "D2" }, { id: "3", seatName: "D3" }, { id: "4", seatName: "D4" }],
    [{ id: "1", seatName: "E1" }, { id: "2", seatName: "E2" }, { id: "3", seatName: "E3" }, { id: "4", seatName: "E4" }],
    [{ id: "1", seatName: "F1" }, { id: "2", seatName: "F2" }, { id: "3", seatName: "F3" }, { id: "4", seatName: "F4" }],
    [{ id: "1", seatName: "G1" }, { id: "2", seatName: "G2" }, { id: "3", seatName: "G3" }, { id: "4", seatName: "G4" }],
    [{ id: "1", seatName: "H1" }, { id: "2", seatName: "H2" }, { id: "3", seatName: "H3" }, { id: "4", seatName: "H4" }],
    [{ id: "1", seatName: "I1" }, { id: "2", seatName: "I2" }, { id: "3", seatName: "I3" }, { id: "4", seatName: "I4" }],
]

interface TicketStateType {
    // tickets: TicketType[],
    bookedTickets: TicketType[],
}

export default function BusSeats({ prodID }: { prodID: string }) {

    const [ticketState, setTicketState] = useState<TicketStateType>({ bookedTickets: [] });
    // const { seats: filteredSeats } = useFilterDuplicateSeats(seats);

    const filteredSeats = filterTwoDArr(demoSeats, ticketState.bookedTickets)

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const res = await api.get(`/ticket/${prodID}`, { signal: controller.signal });

                setTicketState(prev => ({
                    ...prev,
                    bookedTickets: res.data
                }));
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
            {filteredSeats.map((seatArr) => (
                <div className="flex justify-between items-center gap-5 lg:gap-12" key={v4()}>
                    <div className="flex gap-2">
                        <button className={`bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm ${!!seatArr[0].selected && "bg-gray-600 text-white"}`}>{seatArr[0].seatName}</button>
                        <button className={`bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm ${!!seatArr[1].selected && "bg-gray-600 text-white"}`}>{seatArr[1].seatName}</button>
                    </div>
                    <div className="flex gap-2">
                        <button className={`bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm ${!!seatArr[2].selected && "bg-gray-600 text-white"}`}>{seatArr[2].seatName}</button>
                        <button className={`bg-gray-100 text-gray-700 border border-gray-500 px-4 py-1 rounded-sm ${!!seatArr[3].selected && "bg-gray-600 text-white"}`}>{seatArr[3].seatName}</button>
                    </div>
                </div>
            ))}
        </div>

    </div>
    )
}
