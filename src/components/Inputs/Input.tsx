import { useState } from "react";
import { InputType } from '../../types/custom';
import Label from "./Label";

type InputProps = {
    label: string;
    isRequired?: boolean;
    placeholder?: string;
    type?: string;
}

export default function Input({
    label,
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
                name={label}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                autoComplete="off"
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
