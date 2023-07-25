import React from "react";
import { PassengerDetailsType } from "../ModalViews/PersonalInfo";
import CommonSelect from "./CommonSelect";

const genderList = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Others" }
]

interface GenderProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<PassengerDetailsType>>
}

export function Gender({ setValue, value }: GenderProps) {

    return (
        <CommonSelect
            defSelectName="Select Gender"
            label="Gender"
            name="gender"
            options={genderList}
            change={(e) => setValue(prev => ({
                ...prev,
                gender: e.target.value,
            }))}
            value={value}
            valueInName
            required
            selectClasses="bg-white border py-3.5 px-2"
            classNames="w-full"
        />
    )
}
