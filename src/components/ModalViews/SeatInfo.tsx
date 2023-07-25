import { CiSquareRemove } from 'react-icons/ci';

const ticketList = [
    { id: 1, seat: 'D3', fare: 700, cancel: false },
    { id: 2, seat: 'A3', fare: 700, cancel: false },
    { id: 3, seat: 'A3', fare: 700, cancel: false },
    { id: 4, seat: 'A3', fare: 700, cancel: false },
]

export default function SeatInfo() {
    return (
        <>
            <table className="w-full border-collapse text-center">
                <caption className="text-left text-lg font-bold">Seat Information:</caption>
                <thead className="bg-emerald-500 text-gray-50">
                    <tr>
                        <th className="border border-slate-300 lg:p-1">Seat No</th>
                        <th className="border border-slate-300 lg:p-1">Fare (TK)</th>
                        <th className="border border-slate-300 lg:p-1">Remove</th>
                    </tr>
                </thead>

                <tbody className="overflow-auto">
                    {ticketList.map((ticket) => (
                        <tr key={ticket.id} className="">
                            <td className="border border-slate-300">{ticket.seat}</td>
                            <td className="border border-slate-300">{ticket.fare}</td>
                            <td className="text-red-500 border border-slate-300"><button><CiSquareRemove className="h-7 w-7" /></button></td>
                        </tr>
                    ))}
                </tbody>


            </table>
            <div className='grid grid-cols-3 items-center text-center border mt-4'>
                <p className='border-r text-red-600 font-bold text-sm'>Total Seat: <span className='text-black'>{ticketList.length}</span></p>
                <p className='border-r text-red-600 font-bold text-sm'>
                    Fare: <span className='text-black'>{ticketList.length * ticketList[0].fare}</span> <br />
                    <span className='text-red-600 font-bold text-sm'>Charge: <span className='text-black'>130tk</span></span>
                </p>
                <p className='border-r'>
                    <span className='text-red-600 font-bold text-sm'>Net Fare: <span className='text-black'>{ticketList.length * ticketList[0].fare + 130}tk </span></span >
                </p>
            </div>
        </>
    )
}
