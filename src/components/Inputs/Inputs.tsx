/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from "react-router-dom";
import { InputHandlerType, InputHtmlType, InputType } from '../../types/custom';
import Error, { InputError } from "../Error";
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
    brandRef?: React.RefObject<HTMLInputElement>,
    classNames?: string
    defVale?: number
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
    brandRef,
    classNames,
    defVale
}: InputProps) {
    const [value, setValue] = useState(defVale || "");

    const handleChange = (e: InputType) => {
        setValue(e.target.value)
    }

    return (
        <div className={`w-full ${classNames || ""}`}>
            <Label text={label} id={id} isRequired={isRequired} />

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

type Props = {
    label: string;
    type: InputHtmlType;
    name: string;
    change: InputHandlerType;
    value: string | number;
    placeholder: string;
    disableAutoComplete?: boolean;
    required?: boolean;
    minMax?: number[];
    error?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
    classNames?: string
};

export const CommonInput: React.FC<Props> = ({
    label,
    type,
    name,
    change,
    value,
    minMax,
    disableAutoComplete,
    placeholder,
    required,
    error,
    isLoading,
    children,
    classNames
}) => (
    <div className={`mb-3 ${classNames}`}>
        {label && (
            <label
                htmlFor={name}
                className='w-full flex items-center justify-between text-xs md:text-md font-bold tracking-wider px-1 text-cst-white'
            >
                <span className='flex items-center'>
                    <span>{label}</span>
                    {required ? (
                        <span className='ml-0.5 -my-2 text-base font-bold text-cst-red'>
                            *
                        </span>
                    ) : null}
                </span>
                {children}
            </label>
        )}
        {minMax ? (
            <input
                type={type}
                name={name}
                className={`w-full mt-1 p-3.5 text-sm bg-cst-main outline-none rounded-lg tracking-wide border border-cst-secondary-light ${error ? 'text-cst-red' : 'text-cst-white'
                    }`}
                onChange={change}
                value={value || ''}
                min={minMax[0] || 0}
                max={minMax[1] || 0}
                step={10}
                autoComplete='off'
                id={name}
                placeholder={placeholder}
                disabled={isLoading}
            />
        ) : (
            <input
                type={type}
                name={name}
                className={`w-full mt-1 px-3.5 py-3.5 text-sm bg-cst-main outline-none rounded-lg tracking-wide border border-cst-secondary-light ${error ? 'text-cst-red' : 'text-cst-white'
                    }`}
                onChange={change}
                value={value || ''}
                id={name}
                placeholder={placeholder}
                autoComplete={disableAutoComplete ? 'off' : 'on'}
                disabled={isLoading}
            />
        )}
        <Error error={error || ""} />
    </div>
);