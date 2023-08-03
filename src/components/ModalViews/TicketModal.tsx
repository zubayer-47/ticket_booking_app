import { memo, useState } from "react";
import { TicketType } from "../../types/state.types";
import BusSeats from "./BusSeats";
import ModalBox from "./ModalBox";
import PersonalInfo from "./PersonalInfo";

type TicketModalProps = {
    showModal: boolean;
    setShowModal: (isShow: boolean) => void;
    prodID: string;
    price: string | number;
    fromID: string | null;
    coachNo: string;
}
export interface ModalStateType {
    bookedTickets: TicketType[],
    bookingSeats: string[];
}

const TicketModal = memo(function TicketModal({ showModal, setShowModal, prodID, price, fromID, coachNo }: TicketModalProps) {
    const [modalState, setModalState] = useState<ModalStateType>({ bookedTickets: [], bookingSeats: [] });

    return (
        <>
            {!showModal ? null : (
                <ModalBox onClose={() => setShowModal(false)}>
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none">
                        {/*body*/}
                        <div className="relative p-6 grid lg:grid lg:grid-cols-12 gap-5 h-[550px] overflow-auto lg:h-full">

                            <div className="lg:col-span-4 w-full sm:w-[400px] lg:w-full mx-auto">
                                <div className="bg-gray-200 rounded-md p-2">
                                    <BusSeats setState={setModalState} state={modalState} prodID={prodID} />
                                </div>
                            </div>

                            {/* seat and personal information */}
                            <div className="lg:col-span-8 p-1 rounded-md lg:h-[550px] lg:overflow-auto ">
                                <PersonalInfo coachNo={coachNo} fromID={fromID} price={price} state={modalState} setState={setModalState} />
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
                </ModalBox>
            )}
        </>
    );
})

export default TicketModal;