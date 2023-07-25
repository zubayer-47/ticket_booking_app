

import { FormEvent, useState } from 'react';
import CommonInput from '../Inputs/CommonInput';
import { CheckBox } from '../Inputs/Inputs';
import CommonSelect from '../Selects/CommonSelect';
import { Gender } from '../Selects/Selects';

export interface PassengerDetailsType {
    name: string;
    gender: string;
    email: string;
    age: number;
    mobile: number;
    boarding_point: string;
    dropping_point: string;
    isAgree: boolean;
}

const boarding_point_list = [
    { id: 1, name: "Sylhet Kadamtoli Bus Stand (5:00PM)" },
    { id: 2, name: "Humayun Cottor (5:00PM)" },
]

const dropping_point_list = [
    { id: 1, name: "Saydabad" },
    { id: 2, name: "Chittagong Road" },
]

export default function PersonalInfo() {
    const [passengerDetails, setPassengerDetails] = useState<PassengerDetailsType>({
        name: "",
        gender: "",
        email: "",
        age: 0,
        boarding_point: "",
        dropping_point: "",
        mobile: 0,
        isAgree: false,
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const formData = new FormData(e.currentTarget);
        // const data = new FormData(target);

        // const body = {
        //     name: formData.get('name'),
        //     gender: formData.get('gender'),
        //     email: formData.get('email'),
        //     agree: formData.get('agree'),
        //     age: formData.get('age'),
        //     mobile: formData.get('mobile'),
        //     boarding_point: formData.get('boarding_point'),
        //     dropping_point: formData.get('dropping_point'),
        // }

        console.log(passengerDetails)

    }
    return (
        <>
            <form className="mt-3 lg:mt-5 border p-2 rounded-md" onSubmit={handleSubmit}>
                <p className="text-lg font-bold">Personal Information:</p>
                <div className="flex flex-col justify-between items-center gap-2">
                    <CommonInput
                        name='name'
                        placeholder='your name'
                        label='Name'
                        required
                        value={passengerDetails.name}
                        change={e => setPassengerDetails(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))}
                        type='text'
                        inputClasses='border w-full'
                        classNames='w-full'
                    />
                    <Gender
                        value={passengerDetails.gender}
                        setValue={setPassengerDetails}
                    />
                </div>

                <CommonInput
                    name='email'
                    placeholder='example@zubayer.com'
                    label='Email'
                    required
                    value={passengerDetails.email}
                    change={e => setPassengerDetails(prev => ({
                        ...prev,
                        email: e.target.value,
                    }))}
                    type='email'
                    inputClasses='border'
                />

                <div className="grid grid-cols-2 gap-2">
                    <CommonInput
                        name='age'
                        placeholder='00'
                        label='Age'
                        required
                        value={passengerDetails.age}
                        change={e => setPassengerDetails(prev => ({
                            ...prev,
                            age: +e.target.value,
                        }))}
                        type='number'
                        inputClasses='border'
                    />
                    <CommonInput
                        name='mobile'
                        placeholder='01600000000'
                        label='Mobile'
                        required
                        value={passengerDetails.mobile}
                        change={e => setPassengerDetails(prev => ({
                            ...prev,
                            mobile: +e.target.value,
                        }))}
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
                        change={(e) => setPassengerDetails(prev => ({
                            ...prev,
                            boarding_point: e.target.value,
                        }))}
                        value={passengerDetails.boarding_point}
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
                        change={(e) => setPassengerDetails(prev => ({
                            ...prev,
                            dropping_point: e.target.value,
                        }))}
                        value={passengerDetails.dropping_point}
                        valueInName
                        required
                        selectClasses="bg-white border py-3.5 px-2"
                        classNames="w-full"
                    />
                </div>

                <div className='flex justify-center flex-col items-center pt-3'>
                    <CheckBox
                        name='agree'
                        linkText='TERMS AND CONDITIONS'
                        to='/'
                        text='I AGREE TO ALL THE'
                        isAgree={passengerDetails.isAgree}
                        setAgree={setPassengerDetails}
                    />
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
