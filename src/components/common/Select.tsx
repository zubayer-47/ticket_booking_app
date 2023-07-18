import { IdNameBrandLocationFromType, ToType } from "../../types/state.types";
import Label from "../Inputs/Label";

type SelectProps = {
    state: {
        loading: boolean;
        error: string;
        list: ToType[] | IdNameBrandLocationFromType[];
    };
    name: string;
    label: string
    handleSelected?: (id: string, name: string) => void;
    defaultOptionValue?: string;
    empty?: string
}

// give it a detailed name later
export default function Select({ name, label, state, handleSelected, defaultOptionValue, empty }: SelectProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: { target: any }) => {
        const id: string = e.target?.value.split(' ')[1]

        typeof handleSelected === 'function' && handleSelected(id, e.target?.name);
    }

    return (
        <div>
            <Label text={label} isRequired />
            <div className="relative">
                <select
                    name={name}
                    className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                    onClick={handleClick}
                    onChange={handleChange}
                >
                    <option>{defaultOptionValue ?? "Choose From"}</option>
                    {state.list.length > 0 ? state.list.map((fr) => (
                        <option key={fr.id} value={`${fr.name} ${fr.id}`}>{fr.name}</option>
                    )) : (<option value="">{state.loading ? "loading..." : 'No Data Exist'}</option>)}
                </select>

                {state.loading ? (<p className="absolute top-0 right-5 mt-1.5 text-gray-400 select-none">loading...</p>) : null}
            </div>
        </div>
    )
}