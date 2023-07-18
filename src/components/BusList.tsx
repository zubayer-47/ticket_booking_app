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
                <table className="text-center shadow-md w-full border-collapse border border-gray-100">
                    <thead className="w-full">
                        <tr className=" bg-emerald-500 text-white flex items-center">
                            <th className="py-1.5 flex-1 flex-shrink-0">Bus Name</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Coach No</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Starting Counter</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">End Counter</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Fare</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Coach Type</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Arrival Time</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">Seats Available</th>
                            <th className="py-1.5 flex-1 flex-shrink-0">View</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {busList.map(l => <tr className="flex items-center border" key={l.id}>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.coach_no}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.coach_no}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.staring_counter}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.end_counter}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.fare}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.coach_type}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.arrival_time}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0">{l.seats_available}</td>
                            <td className="py-1 px-2 flex-1 flex-shrink-0"><button onClick={handleView}>
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
