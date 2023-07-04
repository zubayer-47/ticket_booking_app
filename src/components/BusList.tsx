
export default function BusList() {
    return (
        <div className="mt-8">
            <table className="w-full table-auto border-collapse border border-slate-400 text-center">
                <thead>
                    <tr>
                        <th className="border border-slate-300">Departing Time</th>
                        <th className="border border-slate-300">Coach No</th>
                        <th className="border border-slate-300">Starting Counter</th>
                        <th className="border border-slate-300">End Counter</th>
                        <th className="border border-slate-300">Fare</th>
                        <th className="border border-slate-300">Coach Type</th>
                        <th className="border border-slate-300">Arrival Time</th>
                        <th className="border border-slate-300">Seats Available</th>
                        <th className="border border-slate-300">View</th>
                    </tr>
                </thead>
                <tbody className="">
                    <tr>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300"><button>icon</button></td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300">10</td>
                        <td className="border border-slate-300"><button>icon</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
