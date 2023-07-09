import BusSeats from "./BusSeats";
import PersonalInfo from "./PersonalInfo";
import SeatInfo from "./SeatInfo";

type TicketModalProps = {
    showModal: boolean;
    setShowModal: (isShow: boolean) => void;
}

export default function TicketModal({ showModal, setShowModal }: TicketModalProps) {

    return (
        <>
            {showModal ? (
                <>
                    <div
                        tabIndex={1}
                        className="flex justify-center items-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                                {/*body*/}
                                <div className="relative p-6 lg:grid lg:grid-cols-12 gap-2 h-[550px] lg:h-full overflow-auto">

                                    <div className="lg:col-span-4 w-[300px] lg:w-full mx-auto">
                                        <div className="bg-gray-200 rounded-md p-2">
                                            <BusSeats />
                                        </div>
                                    </div>

                                    {/* seat and personal information */}
                                    <div className="lg:col-span-8 p-1 rounded-md">
                                        <SeatInfo />
                                        <PersonalInfo />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}