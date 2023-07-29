import axios from 'axios';
import { memo, useCallback, useEffect } from 'react';
import { FiLifeBuoy } from 'react-icons/fi';
import { v4 } from 'uuid';
import { TicketType } from '../../types/state.types';
import api from '../../utils/axios';
import filterTwoDArr from '../../utils/filterTwoDArr';
import { ModalStateType, TicketStateType } from './TicketModal';

const demoSeats: TicketType[][] = [
    [{ id: v4(), seatName: "A1" }, { id: v4(), seatName: "A2" }, { id: v4(), seatName: "A3" }, { id: v4(), seatName: "A4" }],
    [{ id: v4(), seatName: "B1" }, { id: v4(), seatName: "B2" }, { id: v4(), seatName: "B3" }, { id: v4(), seatName: "B4" }],
    [{ id: v4(), seatName: "C1" }, { id: v4(), seatName: "C2" }, { id: v4(), seatName: "C3" }, { id: v4(), seatName: "C4" }],
    [{ id: v4(), seatName: "D1" }, { id: v4(), seatName: "D2" }, { id: v4(), seatName: "D3" }, { id: v4(), seatName: "D4" }],
    [{ id: v4(), seatName: "E1" }, { id: v4(), seatName: "E2" }, { id: v4(), seatName: "E3" }, { id: v4(), seatName: "E4" }],
    [{ id: v4(), seatName: "F1" }, { id: v4(), seatName: "F2" }, { id: v4(), seatName: "F3" }, { id: v4(), seatName: "F4" }],
    [{ id: v4(), seatName: "G1" }, { id: v4(), seatName: "G2" }, { id: v4(), seatName: "G3" }, { id: v4(), seatName: "G4" }],
    [{ id: v4(), seatName: "H1" }, { id: v4(), seatName: "H2" }, { id: v4(), seatName: "H3" }, { id: v4(), seatName: "H4" }],
    [{ id: v4(), seatName: "I1" }, { id: v4(), seatName: "I2" }, { id: v4(), seatName: "I3" }, { id: v4(), seatName: "I4" }],
]

type BusSeatsProps = {
    prodID: string;
    state: TicketStateType,
    setState: React.Dispatch<React.SetStateAction<ModalStateType>>
}

const BusSeats = memo(function BusSeats({ prodID, state, setState }: BusSeatsProps) {
    const filteredSeats = filterTwoDArr(demoSeats, state.bookTickets);

    const fetchProductWiseTicket = useCallback(async (controller: AbortController) => {
        try {
            const res = await api.get(`/ticket/${prodID}`, { signal: controller.signal });

            setState(prev => ({
                ...prev,
                bookTickets: res.data
            }))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // const message = error.response?.data?.message || error.response?.data;
                // return;
            }
        }
    }, [prodID, setState])

    useEffect(() => {
        const controller = new AbortController();

        fetchProductWiseTicket(controller);

        return () => controller.abort()
    }, [fetchProductWiseTicket]);

    const handleCheck = (name: string) => {
        setState(prev => {
            if (prev.seatNames.includes(name)) return {
                ...prev,
                seatNames: prev.seatNames.filter(seatName => seatName !== name)
            }

            return {
                ...prev,
                seatNames: [...prev.seatNames, name]
            }
        });
    }

    console.log(state.seatNames, "72")

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
                        <button
                            onClick={() => handleCheck(seatArr[0].seatName)}
                            className={`border border-gray-500 px-4 py-1 rounded-sm 
                                    ${!!seatArr[0].selected && "bg-gray-600 text-white"} 
                                    ${state.seatNames.includes(seatArr[0].seatName) ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            {seatArr[0].seatName}
                        </button>
                        <button
                            onClick={() => handleCheck(seatArr[1].seatName)}
                            className={`border border-gray-500 px-4 py-1 rounded-sm 
                            ${!!seatArr[1].selected && "bg-gray-600 text-white"} 
                            ${state.seatNames.includes(seatArr[1].seatName) ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            {seatArr[1].seatName}
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleCheck(seatArr[2].seatName)}
                            className={`border border-gray-500 px-4 py-1 rounded-sm 
                                    ${!!seatArr[2].selected && "bg-gray-600 text-white"} 
                                    ${state.seatNames.includes(seatArr[2].seatName) ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            {seatArr[2].seatName}
                        </button>
                        <button
                            onClick={() => handleCheck(seatArr[3].seatName)}
                            className={`border border-gray-500 px-4 py-1 rounded-sm 
                                    ${!!seatArr[3].selected && "bg-gray-600 text-white"} 
                                    ${state.seatNames.includes(seatArr[3].seatName) ? "bg-gray-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        >
                            {seatArr[3].seatName}
                        </button>
                    </div>
                </div>
            ))}
        </div>

    </div>
    )
}
)

export default BusSeats;