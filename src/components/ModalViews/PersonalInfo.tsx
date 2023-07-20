

import { FormEvent } from 'react';
import Input, { CheckBox } from '../Inputs/Inputs';
import Label from '../Inputs/Label';
import { Gender } from '../Selects/Selects';


export default function PersonalInfo() {
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

    }
    return (
        <>
            <form className="mt-3 lg:mt-5 border p-2 rounded-md space-y-2" onSubmit={handleSubmit}>
                <p className="text-lg">Personal Information:</p>
                <div className="grid grid-cols-2 gap-2">
                    <Input id='name' name='name' isRequired label="Name" placeholder="your name" />
                    <div className="flex justify-center items-center mt-5">
                        <Gender />
                    </div>
                </div>

                <Input id='email' name='email' isRequired label="email" type="email" placeholder="example@zubayer.com" />

                <div className="grid grid-cols-2 gap-2">
                    <Input id='age' name='age' isRequired label="Age" placeholder="18" type="number" />
                    <Input id='mobile' name='mobile' isRequired label="Mobile" placeholder="01600000000" type="tel" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-center items-center">
                        <Label text="Boarding Point" isRequired />
                        <select name='boarding_point' className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                            <option selected>Select a Boarding Point</option>
                            <option value="kadamtoli">Sylhet Kadamtoli Bus Stand (5:00PM)</option>
                            <option value="humayun_cottor">Humayun Cottor (5:00PM)</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <Label text="Dropping Point" isRequired />
                        <select name='dropping_point' className="block w-full p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                            <option selected>Select a Dropping Point</option>
                            <option value="kadamtoli">Sayedabad (11:00PM)</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-center flex-col items-center pt-3'>
                    <CheckBox
                        name='agree'
                        linkText='TERMS AND CONDITIONS'
                        to='/'
                        text='I AGREE TO ALL THE'
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
