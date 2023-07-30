

import { FormEvent, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../contexts/Context';
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
    state: ModalStateType
    price: string | number
    setState: React.Dispatch<React.SetStateAction<ModalStateType>>
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

export default function PersonalInfo({ state, price, setState }: PersonalInfoProps) {
    const { state: { authenticated } } = useContext(Context);
    const [passengerPersonalInfo, setPassengerPersonalInfo] = useState<PassengerPersonalInfoState>({ info: { age: 0, boarding_point: "", dropping_point: "", email: "", gender: "", agree: false, mobile: 0, name: "" }, isLoading: false });
    const [isSubmitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
        <>
            <SeatInfo setState={setState} seatNames={state.seatNames} price={price} />

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
                        options={boarding_point_list}
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
                        options={dropping_point_list}
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
                        className="bg-emerald-500 w-[100px] text-white mt-2 active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                        Confirm
                    </button>
                </div>
            </form>

            {!isSubmitted ? null : <CreatePdf />}

        </>
    )
}
