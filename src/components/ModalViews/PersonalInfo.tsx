

import { FormEvent, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../contexts/Context';
import CommonInput from '../Inputs/CommonInput';
import CommonSelect from '../Selects/CommonSelect';
import { Gender } from './Gender';
import SeatInfo from './SeatInfo';

const boarding_point_list = [
    { id: 1, name: "Sylhet Kadamtoli Bus Stand (5:00PM)" },
    { id: 2, name: "Humayun Cottor (5:00PM)" },
]

const dropping_point_list = [
    { id: 1, name: "Saydabad" },
    { id: 2, name: "Chittagong Road" },
]

type PersonalInfoProps = {
    seatNames: string[]
    price: string | number
}

export default function PersonalInfo({ seatNames, price }: PersonalInfoProps) {
    const { state: { passengerPersonalInfo, authenticated }, dispatch } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!authenticated) {
            navigate('/sign-in', { state: { from: location } });
            return;
        }
    }

    return (
        <>
            <SeatInfo seatNames={seatNames} price={price} />

            <form className="mt-3 lg:mt-5 border p-2 rounded-md" onSubmit={handleSubmit}>
                <p className="text-lg font-bold">Personal Information:</p>
                <div className="flex flex-col justify-between items-center gap-2">
                    <CommonInput
                        name='name'
                        placeholder='your name'
                        label='Name'
                        required
                        value={passengerPersonalInfo.info.name}
                        change={e => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "name", value: e.target.value } })}
                        type='text'
                        inputClasses='border w-full'
                        classNames='w-full'
                    />
                    <Gender
                        value={passengerPersonalInfo.info.gender}
                    />
                </div>

                <CommonInput
                    name='email'
                    placeholder='example@zubayer.com'
                    label='Email'
                    required
                    value={passengerPersonalInfo.info.email}
                    change={e => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "email", value: e.target.value } })}
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
                        change={e => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "age", value: +e.target.value } })}
                        type='number'
                        inputClasses='border'
                    />
                    <CommonInput
                        name='mobile'
                        placeholder='01600000000'
                        label='Mobile'
                        required
                        value={passengerPersonalInfo.info.mobile}
                        change={e => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "mobile", value: +e.target.value } })}
                        type='number'
                        inputClasses='border'
                    />
                </div>

                <div className="flex justify-center items-center gap-2">
                    <CommonSelect
                        defSelectName="Select Boarding Point"
                        label="Boarding Point"
                        name="boarding_point"
                        options={boarding_point_list}
                        change={(e) => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "boarding_point", value: e.target.value } })}
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
                        change={(e) => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "dropping_point", value: e.target.value } })}
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
                            checked={passengerPersonalInfo.info.isAgree}
                            onChange={() => {
                                const isAgree = false
                                dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "isAgree", value: !isAgree } })
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

        </>
    )
}
