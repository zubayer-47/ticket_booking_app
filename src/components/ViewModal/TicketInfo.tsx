import { Link } from "react-router-dom"
import Input from "../Inputs/Input"
import Label from "../Inputs/Label"

const ticketList = [
    { id: 1, seat: 'D3', fare: 700, cancel: false },
    { id: 1, seat: 'A3', fare: 700, cancel: false },
    { id: 1, seat: 'A3', fare: 700, cancel: false },
    { id: 1, seat: 'A3', fare: 700, cancel: false },
]


export default function SeatInfo() {
    return (
        <>
            <table className="w-full border-collapse text-center">
                <caption className="text-left text-lg">Seat Information:</caption>
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
                            <td className="text-red-500 border border-slate-300"><button>X</button></td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total Seat: {ticketList.length}</td>
                        <td>Fare: {ticketList.length * ticketList[0].fare}
                            <p>Charge: 130tk</p></td>
                        <td>

                            <p>Total <br /> Fare: {ticketList.length * ticketList[0].fare + 130}tk</p >
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="mt-3 lg:mt-5 border p-2 rounded-md space-y-2">
                <p className="text-lg">Personal Information:</p>
                <div className="grid grid-cols-2 gap-2">
                    <Input isRequired label="Name" placeholder="your name" />
                    <div className="flex justify-center items-center">
                        <Label text="Gender" isRequired />
                        <select id="gender" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Input isRequired label="email" type="email" placeholder="example@zubayer.com" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Input isRequired label="Age" placeholder="18" type="number" />
                    <Input isRequired label="Mobile" placeholder="01600000000" type="tel" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-center items-center">
                        <Label text="Boarding Point" isRequired />
                        <select id="gender" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option selected>Select a Boarding Point</option>
                            <option value="kadamtoli">Sylhet Kadamtoli Bus Stand (5:00PM)</option>
                            <option value="humayun_cottor">Humayun Cottor (5:00PM)</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <Label text="Dropping Point" isRequired />
                        <select id="gender" className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option selected>Select a Dropping Point</option>
                            <option value="kadamtoli">Sayedabad (11:00PM)</option>
                        </select>
                    </div>
                </div>
            </div>

            <p className="text-center mt-3">
                <input type="checkbox" name="agree" id="agree" /> <span className="text-xs">I AGREE TO ALL THE <Link to='/' className="text-blue-700 font-bold">TERMS AND CONDITIONS</Link></span>
            </p>
        </>
    )
}
