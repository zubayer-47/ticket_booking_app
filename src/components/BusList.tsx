import { useState } from "react";
import { FiLayout } from "react-icons/fi";
import TicketModal from "./ModalViews/TicketModal";

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
            <h1 className="text-3xl tracking-wide my-2">Available Buses</h1>
            <div className="overflow-auto">
                <table className="text-center shadow-md w-full">
                    <thead>
                        <tr className=" bg-emerald-500 text-white">
                            <th className="border border-slate-300 lg:p-1">Bus Name</th>
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
                            <td className="border border-slate-300">{l.coach_no}</td>
                            <td className="border border-slate-300">{l.coach_no}</td>
                            <td className="border border-slate-300">{l.staring_counter}</td>
                            <td className="border border-slate-300">{l.end_counter}</td>
                            <td className="border border-slate-300">{l.fare}</td>
                            <td className="border border-slate-300">{l.coach_type}</td>
                            <td className="border border-slate-300">{l.arrival_time}</td>
                            <td className="border border-slate-300">{l.seats_available}</td>
                            <td className="border border-slate-300"><button onClick={handleView}>
                                <FiLayout className="w-6 h-6 text-emerald-500" />
                            </button></td>
                        </tr>)}
                    </tbody>
                </table>

                <TicketModal showModal={showModal} setShowModal={setShowModal} />
            </div>
        </div>
    )
}
