import { useContext } from "react";
import { Context } from "../../contexts/Context";
import CommonSelect from "../Selects/CommonSelect";

const genderList = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Others" }
]

interface GenderProps {
    value: string;
}

export function Gender({ value }: GenderProps) {
    const { dispatch } = useContext(Context)

    return (
        <CommonSelect
            defSelectName="Select Gender"
            label="Gender"
            name="gender"
            options={genderList}
            change={e => dispatch({ type: "ADD_PASSENGER_INFO", payload: { name: "gender", value: e.target.value } })}
            value={value}
            valueInName
            required
            selectClasses="bg-white border py-3.5 px-2"
            classNames="w-full"
        />
    )
}
