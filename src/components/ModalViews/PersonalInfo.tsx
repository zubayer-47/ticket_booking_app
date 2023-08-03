

import axios from 'axios';
import { FormEvent, memo, useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Context } from '../../contexts/Context';
import { IdNameBrandLocationFromType } from '../../types/state.types';
import api from '../../utils/axios';
import { LocationsType } from '../Booking';
import CommonInput from '../Inputs/CommonInput';
import CommonSelect from '../Selects/CommonSelect';
import CreatePdf from '../pdf/CreatePdf';
import { Gender } from './Gender';
import SeatInfo from './SeatInfo';
import { ModalStateType } from './TicketModal';

const boarding_point_list = [
    { id: 1, name: "Sylhet Kadamtoli Bus Stand (5:00PM)" },
    { id: 2, name: "Humayun Cottor (5:00PM)" },
]

const dropping_point_list = [
    { id: 1, name: "Saydabad" },
    { id: 2, name: "Chittagong Road" },
]

type PersonalInfoProps = {
    state: ModalStateType;
    price: string | number;
    fromID: string | null;
    coachNo: string;
    setState: React.Dispatch<React.SetStateAction<ModalStateType>>;
}
interface PassengerPersonalInfoState {
    info: {
        name: string;
        gender: string;
        email: string;
        age: number;
        mobile: number;
        boarding_point: string;
        dropping_point: string;
        agree: boolean;
    },
    isLoading: boolean
}

const PersonalInfo = memo(function PersonalInfo({ state, price, fromID, coachNo, setState }: PersonalInfoProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const handlePrint = useReactToPrint({
        content: () => divRef.current,
        documentTitle: 'Ticket.pdf'
    });
    const [locations, setLocations] = useState<{ toLocations: LocationsType[], fromLocations: IdNameBrandLocationFromType[] }>({ fromLocations: [], toLocations: [] });

    const { state: { authenticated } } = useContext(Context);
    const [passengerPersonalInfo, setPassengerPersonalInfo] = useState<PassengerPersonalInfoState>({ info: { age: 0, boarding_point: "", dropping_point: "", email: "", gender: "", agree: false, mobile: 0, name: "" }, isLoading: false });
    const [isSubmitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // get specific location
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const res = await api.get(`location/${fromID}`, { signal: controller.signal });

                setLocations(prev => ({
                    ...prev,
                    fromLocations: [res.data],
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message;

                    // setToLocations((prev) => ({
                    //   ...prev,
                    //   error: message,
                    // }));
                    return;
                }
                //   setToLocations((prev) => ({
                //     ...prev,
                //     error: "Something Went Wrong! Please Try Again.",
                //   }));
            }
        })()

        return () => controller.abort()
    }, [fromID]);

    // get locations based on from
    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const res = await api.get(`/search/toLocation/${fromID}`, { signal: controller.signal });

                setLocations(prev => ({
                    ...prev,
                    toLocations: res.data,
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message;

                    // setToLocations((prev) => ({
                    //   ...prev,
                    //   error: message,
                    // }));
                    return;
                }
                //   setToLocations((prev) => ({
                //     ...prev,
                //     error: "Something Went Wrong! Please Try Again.",
                //   }));
            }
        })()

        return () => controller.abort()
    }, [fromID])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ state, passengerPersonalInfo });

        if (!authenticated) {
            navigate('/sign-in', { state: { from: location } });
            return;
        }

        setSubmitted(true)
    }

    const onChange = (name: string, value: string | boolean) => {
        setPassengerPersonalInfo(prev => ({
            ...prev,
            info: {
                ...prev.info,
                [name]: value
            }
        }))
    }

    return (
        <div className='z-50'>
            <SeatInfo setState={setState} bookingSeats={state.bookingSeats} price={price} />

            <form className="mt-3 lg:mt-5 border p-2 rounded-md" onSubmit={handleSubmit}>
                <p className="text-lg font-bold">Personal Information:</p>
                <div className="flex flex-col justify-between items-center gap-2">
                    <CommonInput
                        name='name'
                        placeholder='your name'
                        label='Name'
                        required
                        value={passengerPersonalInfo.info.name}
                        change={e => onChange(e.target.name, e.target.value)}
                        type='text'
                        inputClasses='border w-full'
                        classNames='w-full'
                    />
                    <Gender
                        value={passengerPersonalInfo.info.gender}
                        onChange={onChange}
                    />
                </div>

                <CommonInput
                    name='email'
                    placeholder='example@zubayer.com'
                    label='Email'
                    required
                    value={passengerPersonalInfo.info.email}
                    change={e => onChange(e.target.name, e.target.value)}
                    type='email'
                    inputClasses='border'
                />

                <div className="grid grid-cols-2 gap-2">
                    <CommonInput
                        name='age'
                        placeholder='00'
                        minMax={[0, 100]}
                        label='Age'
                        required
                        value={passengerPersonalInfo.info.age}
                        change={e => onChange(e.target.name, e.target.value)}
                        type='number'
                        inputClasses='border'
                    />
                    <CommonInput
                        name='mobile'
                        placeholder='01600000000'
                        label='Mobile'
                        required
                        value={passengerPersonalInfo.info.mobile}
                        change={e => onChange(e.target.name, e.target.value)}
                        type='mobile'
                        inputClasses='border'
                    />
                </div>

                <div className="flex justify-center items-center gap-2">
                    <CommonSelect
                        defSelectName="Select Boarding Point"
                        label="Boarding Point"
                        name="boarding_point"
                        options={locations.fromLocations}
                        change={e => onChange(e.target.name, e.target.value)}
                        value={passengerPersonalInfo.info.boarding_point}
                        valueInName
                        required
                        selectClasses="bg-white border py-3.5 px-2"
                        classNames="w-full"
                    />

                    <CommonSelect
                        defSelectName="Select Dropping Point"
                        label="Dropping Point"
                        name="dropping_point"
                        options={locations.toLocations}
                        change={e => onChange(e.target.name, e.target.value)}
                        value={passengerPersonalInfo.info.dropping_point}
                        valueInName
                        required
                        selectClasses="bg-white border py-3.5 px-2"
                        classNames="w-full"
                    />
                </div>

                <div className='flex justify-center flex-col items-center pt-3'>

                    <div className='flex justify-center items-center gap-1'>
                        <input
                            type='checkbox'
                            name='agree'
                            checked={passengerPersonalInfo.info.agree}
                            onChange={(e) => {
                                const isAgree = false
                                onChange(e.target.name, !isAgree)
                            }}
                            required
                        />
                        <span className='text-xs'>
                            I AGREE TO ALL THE{' '}
                            <Link to={'/'} className='text-blue-700 font-bold'>
                                TERMS AND CONDITIONS
                            </Link>
                        </span>
                    </div>

                    <button
                        type="submit"
                        // onClick={() => handlePrint}
                        onClick={() => {
                            const { age, agree, boarding_point, dropping_point, email, gender, mobile, name } = passengerPersonalInfo.info
                            console.log(!age || !agree || !boarding_point || !dropping_point || !email || !gender || !mobile || !name, 'click', passengerPersonalInfo.info)
                            if (!age || !agree || !boarding_point || !dropping_point || !email || !gender || !mobile || !name) return

                            handlePrint();
                        }}
                        ref={submitButtonRef}
                        className="bg-emerald-500 w-[100px] text-white mt-2 active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                        Confirm
                    </button>
                </div>
            </form>

            <div className="hidden">
                <CreatePdf ref={divRef} state={state} passengerInfo={passengerPersonalInfo.info} coachNo={coachNo} />
            </div>
        </div>
    )
})

export default PersonalInfo