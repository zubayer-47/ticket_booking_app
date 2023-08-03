import { ReactNode, forwardRef } from "react";

interface Props {
    children?: ReactNode;
}

export type DivRef = HTMLDivElement;

const CreatePdf = forwardRef<DivRef, Props>((props, ref) => {

    return (
        <div ref={ref} className="grid grid-cols-12 gap-1 max-w-5xl mx-auto my-10 p-5">
            <div className="col-span-6 relative pr-0.5 border-dashed border-r-2">
                <h1 className="text-3xl mb-10 bg-red-700 text-white p-4 rounded-md">Shakura Paribahan Pvt. Ltd.</h1>

                <div className="space-y-1">
                    <h1 className="font-bold">Dhaka To Barisal</h1>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Passenger Name: </span> A B M ZUBAYER</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Mobile: </span>01609053512</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Ticket No: </span>01609053512</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Coach No: </span>01609053512</p>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Boarding: </span>Saydabad</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Dropping: </span>Isladi</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Date: </span>20/11/23</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Time: </span>10:46PM</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Date: </span>21/11/23</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Time: </span>12:30PM</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Seat No: </span>A3, B4, C4</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Total Seats: </span>3</p>
                    </div>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Beat Fare(tk): </span>600</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Total Fare(tk): </span>600</p>
                </div>

                <p className="-rotate-90 text-lg absolute -right-8 top-1/2 text-gray-400">Passenger Copy</p>
            </div>

            <div className="col-span-6 relative">
                <h1 className="text-3xl mb-10 bg-emerald-700 text-white p-4 rounded-md">Shakura Paribahan Pvt. Ltd.</h1>

                <div className="space-y-1">
                    <h1 className="font-bold">Dhaka To Barisal</h1>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Passenger Name: </span> A B M ZUBAYER</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Mobile: </span>01609053512</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Ticket No: </span>01609053512</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Coach No: </span>01609053512</p>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Boarding: </span>Saydabad</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Dropping: </span>Isladi</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Date: </span>20/11/23</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Time: </span>10:46PM</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Date: </span>21/11/23</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Time: </span>12:30PM</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Seat No: </span>A3, B4, C4</p>
                        <p className="tracking-wide"><span className="font-bold tracking-normal">Total Seats: </span>3</p>
                    </div>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Beat Fare(tk): </span>600</p>
                    <p className="tracking-wide"><span className="font-bold tracking-normal">Total Fare(tk): </span>600</p>
                </div>

                <p className="-rotate-90 text-lg absolute -right-8 top-1/2 text-gray-400">Guide Copy</p>
            </div>
        </div>
    )
})

export default CreatePdf;

// export default function App() {
//   const parentDivRef = useRef<HTMLDivElement>(null)
//   const handlePrint = useReactToPrint({
//     content: () => parentDivRef.current,
//     documentTitle: 'Ticket.pdf'
//   })

//   return (
//     <>
//       <div ref={parentDivRef} className="grid grid-cols-12 gap-1 max-w-5xl mx-auto my-10 p-5">
//         <div className="col-span-6 relative pr-0.5 border-dashed border-r-2">
//           <h1 className="text-3xl mb-10 bg-red-700 text-white p-4 rounded-md">Shakura Paribahan Pvt. Ltd.</h1>

//           <div className="space-y-1">
//             <h1 className="font-bold">Dhaka To Barisal</h1>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Passenger Name: </span> A B M ZUBAYER</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Mobile: </span>01609053512</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Ticket No: </span>01609053512</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Coach No: </span>01609053512</p>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Boarding: </span>Saydabad</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Dropping: </span>Isladi</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Date: </span>20/11/23</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Time: </span>10:46PM</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Date: </span>21/11/23</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Time: </span>12:30PM</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Seat No: </span>A3, B4, C4</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Total Seats: </span>3</p>
//             </div>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Beat Fare(tk): </span>600</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Total Fare(tk): </span>600</p>
//           </div>

//           <p className="-rotate-90 text-lg absolute -right-8 top-1/2 text-gray-400">Passenger Copy</p>
//         </div>

//         <div className="col-span-6 relative">
//           <h1 className="text-3xl mb-10 bg-emerald-700 text-white p-4 rounded-md">Shakura Paribahan Pvt. Ltd.</h1>

//           <div className="space-y-1">
//             <h1 className="font-bold">Dhaka To Barisal</h1>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Passenger Name: </span> A B M ZUBAYER</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Mobile: </span>01609053512</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Ticket No: </span>01609053512</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Coach No: </span>01609053512</p>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Boarding: </span>Saydabad</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Dropping: </span>Isladi</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Date: </span>20/11/23</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Purchase Time: </span>10:46PM</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Date: </span>21/11/23</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Journey Time: </span>12:30PM</p>
//             </div>
//             <div className="grid grid-cols-2">
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Seat No: </span>A3, B4, C4</p>
//               <p className="tracking-wide"><span className="font-bold tracking-normal">Total Seats: </span>3</p>
//             </div>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Beat Fare(tk): </span>600</p>
//             <p className="tracking-wide"><span className="font-bold tracking-normal">Total Fare(tk): </span>600</p>
//           </div>

//           <p className="-rotate-90 text-lg absolute -right-8 top-1/2 text-gray-400">Guide Copy</p>
//         </div>
//       </div>

//       <button type="button" onClick={handlePrint} className="bg-emerald-600 p-2 rounded-md text-white hover:bg-emerald-700">Print PDF</button>
//     </>
//   )
// }
// https://pspdfkit.com/blog/2023/how-to-fill-a-pdf-form-in-react/
// https://pspdfkit.com/blog/2019/create-pdfs-with-react/#:~:text=To%20create%20a%20PDF%2C%20you,root%20of%20a%20PDF%20file.