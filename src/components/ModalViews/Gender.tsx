import CommonSelect from "../Selects/CommonSelect";

const genderList = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Others" }
]

interface GenderProps {
    value: string;
    onChange: (name: string, value: string | boolean) => void
}

export function Gender({ value, onChange }: GenderProps) {
    return (
        <CommonSelect
            defSelectName="Select Gender"
            label="Gender"
            name="gender"
            options={genderList}
            change={e => onChange(e.target.name, e.target.value)}
            value={value}
            valueInName
            required
            selectClasses="bg-white border py-3.5 px-2"
            classNames="w-full"
        />
    )
}
