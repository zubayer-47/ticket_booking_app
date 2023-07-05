import { useState } from "react";
import { Link } from "react-router-dom";
import { InputType } from '../../types/custom';
import Label from "./Label";

type InputProps = {
    label: string;
    name: string;
    isRequired?: boolean;
    placeholder?: string;
    type?: string;
}

export default function Input({
    label,
    name,
    type = 'text',
    placeholder,
    isRequired = false
}: InputProps) {
    const [value, setValue] = useState('');

    const handleChange = (e: InputType) => {
        setValue(e.target.value)
    }

    return (
        <div className="flex justify-center items-center gap-2">
            <Label text={label} isRequired={isRequired} />

            <input
                type={type}
                placeholder={placeholder}
                id={label}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autoComplete="off"
                value={value}
                onChange={handleChange}
                required={isRequired}
            />
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
