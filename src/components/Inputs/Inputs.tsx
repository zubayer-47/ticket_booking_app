/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { InputType } from '../../types/custom';
import { InputError } from "../Error";
import Label from "./Label";

type InputProps = {
    label?: string;
    name: string;
    id?: string;
    isRequired?: boolean;
    placeholder?: string;
    type?: string;
    defaultSize?: boolean;
    error?: string;
    disabled?: boolean
    brandRef?: React.RefObject<HTMLInputElement>
}

export default function Input({
    label = '',
    name,
    type = 'text',
    placeholder,
    id = '',
    isRequired = false,
    defaultSize = false,
    error,
    disabled = false,
    brandRef
}: InputProps) {
    const [value, setValue] = useState('');

    const handleChange = (e: InputType) => {
        setValue(e.target.value)
    }

    return (
        <div className="w-full">
            {id ? (<Label text={label} id={id} isRequired={isRequired} />) : null}

            <input
                ref={brandRef}
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:outline-none block w-full ${!error?.length ? "focus:ring-blue-500 focus:border-blue-500" : ""} ${!error?.length ? "border-gray-400" : "border-red-400"} ${!defaultSize ? "p-1" : 'p-2'} `}
                autoComplete="off"
                value={value}
                onChange={handleChange}
                required={isRequired}
                disabled={disabled}
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
                    className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${!!error?.length ? "border-red-400" : "border-gray-300"}`}
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

export function DateInput() {
    return <input type="date" className='w-full tracking-widest border outline-none rounded-md p-1.5' name="date" id="date" />
}

