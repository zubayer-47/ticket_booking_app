import { CiSquareRemove } from 'react-icons/ci';
import { v4 } from 'uuid';
import { ModalStateType } from './TicketModal';

const ticketList = [
    { id: 1, seat: 'D3', fare: 700, cancel: false },
    { id: 2, seat: 'A3', fare: 700, cancel: false },
    { id: 3, seat: 'A3', fare: 700, cancel: false },
    { id: 4, seat: 'A3', fare: 700, cancel: false },
]

type SeatInfoProps = {
    seatNames: string[];
    price: string | number;
    setState: React.Dispatch<React.SetStateAction<ModalStateType>>;
    charge?: number;
}

export default function SeatInfo({ seatNames, price, setState, charge }: SeatInfoProps) {
    const handleDelete = (name: string) => {
        setState(prev => ({
            ...prev,
            seatNames: prev.seatNames.filter(seatName => seatName !== name)
        }))
    }

    const fare = seatNames.length * +price;
    const charge_fare = charge ? charge : 0
    const net_fare = fare + charge_fare;

    return (
        <>
            <h1 className="text-left text-lg font-bold">Seat Information:</h1>
            <div className={`max-h-[250px] overflow-auto `}>
                <table className="w-full border-collapse text-center">
                    <thead className="bg-emerald-500 text-gray-50">
                        <tr>
                            <th className="border border-slate-300 lg:p-1">Seat No</th>
                            <th className="border border-slate-300 lg:p-1">Fare (TK)</th>
                            <th className="border border-slate-300 lg:p-1">Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {seatNames.map((seatName) => (
                            <tr key={v4()}>
                                <td className="border border-slate-300">{seatName}</td>
                                <td className="border border-slate-300">{price}</td>
                                <td className="text-red-500 border border-slate-300">
                                    <button type='button' onClick={() => handleDelete(seatName)}>
                                        <CiSquareRemove className="h-7 w-7" />
                                    </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className='grid grid-cols-3 items-center text-center border mt-4'>
                <p className='border-r text-red-600 font-bold text-sm'>Total Seat: <span className='text-black'>{ticketList.length}</span></p>
                <p className='border-r text-red-600 font-bold text-sm'>
                    Fare: <span className='text-black'>{fare} TK</span> <br />
                    {charge ? (
                        <span className='text-red-600 font-bold text-sm'>Charge: <span className='text-black'>{charge_fare}</span></span>
                    ) : null}
                </p>
                <p className='border-r'>
                    <span className='text-red-600 font-bold text-sm'>Net Fare: <span className='text-black'>{net_fare}tk </span></span >
                </p>
            </div>
        </>

    )
}
