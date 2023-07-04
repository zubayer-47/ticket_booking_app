import { useState } from "react";
import TicketModal from "./ViewModal/TicketModal";

type BUS_LIST_TYPE = {
    id: string;
    departing_time: string;
    coach_no: string;
    staring_counter: string;
    end_counter: string;
    fare: string;
    coach_type: string;
    arrival_time: string;
    seats_available: number;
}

const busList: BUS_LIST_TYPE[] = [
    {
        id: '1',
        departing_time: '10:00 PM',
        coach_no: '105-syl-dhk',
        staring_counter: "Moulovibazar",
        end_counter: "Saydabad",
        fare: 'E-Class: 700.00',
        coach_type: 'NON-AC',
        arrival_time: '5:00 AM',
        seats_available: 4
    },
    {
        id: '2',
        departing_time: '10:00 PM',
        coach_no: '105-syl-dhk',
        staring_counter: "Moulovibazar",
        end_counter: "Saydabad",
        fare: 'E-Class: 700.00',
        coach_type: 'AC',
        arrival_time: '5:00 AM',
        seats_available: 4
    },
]

export default function BusList() {
    const [showModal, setShowModal] = useState(false);

    const handleView = () => {
        setShowModal(true)
    }

    return (
        <div className="mt-8">
            <table className="w-full table-auto border-collapse border border-slate-400 text-center">
                <thead className="bg-emerald-500 text-white">
                    <tr>
                        <th className="border border-slate-300 lg:p-1">Departing Time</th>
                        <th className="border border-slate-300 lg:p-1">Coach No</th>
                        <th className="border border-slate-300 lg:p-1">Starting Counter</th>
                        <th className="border border-slate-300 lg:p-1">End Counter</th>
                        <th className="border border-slate-300 lg:p-1">Fare</th>
                        <th className="border border-slate-300 lg:p-1">Coach Type</th>
                        <th className="border border-slate-300 lg:p-1">Arrival Time</th>
                        <th className="border border-slate-300 lg:p-1">Seats Available</th>
                        <th className="border border-slate-300 lg:p-1">View</th>
                    </tr>
                </thead>
                <tbody className="">
                    {busList.map(l => <tr key={l.id}>
                        <td className="border border-slate-300">{l.departing_time}</td>
                        <td className="border border-slate-300">{l.coach_no}</td>
                        <td className="border border-slate-300">{l.staring_counter}</td>
                        <td className="border border-slate-300">{l.end_counter}</td>
                        <td className="border border-slate-300">{l.fare}</td>
                        <td className="border border-slate-300">{l.coach_type}</td>
                        <td className="border border-slate-300">{l.arrival_time}</td>
                        <td className="border border-slate-300">{l.seats_available}</td>
                        <td className="border border-slate-300"><button onClick={handleView}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                        </svg>
                        </button></td>
                    </tr>)}
                </tbody>
            </table>

            <TicketModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}
