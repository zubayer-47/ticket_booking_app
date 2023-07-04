
const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function BusSeats() {
    return (<div className="col-span-4 bg-gray-200 p-2  rounded-md">
        <table className="border border-collapse w-full">
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

        <div className="flex justify-between items-center mt-2">
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </span>

            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
            </span>
        </div>

        {/* seats */}
        <div className="grid gap-2 mt-5">
            {seats.map(() => (<div className="flex justify-between items-center gap-16">
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
