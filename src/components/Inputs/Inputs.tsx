/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { InputType } from '../../types/custom';
import { InputError } from "../Error";
import Label from "./Label";

type InputProps = {
    label: string;
    name: string;
    id: string;
    isRequired?: boolean;
    placeholder?: string;
    type?: string;
    defaultSize?: boolean;
    error?: string;
}

export default function Input({
    label,
    name,
    type = 'text',
    placeholder,
    id,
    isRequired = false,
    defaultSize = false,
    error
}: InputProps) {
    const [value, setValue] = useState('');

    const handleChange = (e: InputType) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <Label text={label} id={id} isRequired={isRequired} />

            <input
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                className={`bg-gray-50 border ${!!error?.length ? "border-red-400" : "border-gray-300"} text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full ${!defaultSize ? "p-1" : 'p-2'} dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                autoComplete="off"
                value={value}
                onChange={handleChange}
                required={isRequired}
            />
            {error && (
                <InputError error={error} />
            )}
        </div>
    )
}

type CheckBoxProps = {
    name: string;
    to: string;
    linkText: string;
    text: string
}

export function CheckBox({ name, to, text, linkText }: CheckBoxProps) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(prev => !prev)
    }

    return (
        <div className="flex justify-center items-center gap-1">
            <input type="checkbox" name={name} checked={checked} onChange={handleChange} required />
            <span className="text-xs">{text} <Link to={to} className="text-blue-700 font-bold">{linkText}</Link></span>
        </div>
    )
}

type PasswordInputProps = {
    id?: string;
    text?: string;
    error?: string;
}

export function PasswordInput({ text = "Password", id = "password", error = "" }: PasswordInputProps) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');


    const onVisible = () => setShow((prev) => !prev);

    const handleChange = (e: InputType) => {
        setValue(e.target.value)
    }

    return (
        <div>
            <Label id={id} text={text} isRequired />
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={id}
                    id={id}
                    onChange={handleChange}
                    value={value || ""}
                    placeholder="*********"
                    className={`bg-gray-50 border 
                    ${!!error?.length ? "border-red-400" : "border-gray-300"}
                     text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 `}
                    autoComplete="off"
                />
                {!value ? null : (
                    <button type='button' className='p-2 absolute right-0 top-0' onClick={onVisible}>
                        {show ? (
                            <FiEyeOff className='w-5 h-5 stroke-1 text-indigo-300' />
                        ) : (
                            <FiEye className='w-5 h-5 stroke-1 text-indigo-300' />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <InputError error={error} />
            )}
        </div>
    )
}
