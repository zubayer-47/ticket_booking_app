import { useContext, useEffect, useRef } from "react";
import { Context } from "../../contexts/Context";
import { IdNameBrandLocationFromType, ToType } from "../../types/state.types";
import Label from "../Inputs/Label";

type SelectProps = {
    state: ToType[] | IdNameBrandLocationFromType[];
    name: string;
    label: string
    handleSelected?: (id: string) => void;
    defaultOptionValue?: string;
    empty?: string
}

// give it a detailed name later
// eslint-disable-next-line no-empty-pattern
export default function Select({ name, label, state, handleSelected, defaultOptionValue, empty }: SelectProps) {
    const selectRef = useRef(null);
    const { dispatch, state: appState } = useContext(Context);


    useEffect(() => {

        console.log(appState.from.selectedFromId)
    }, [appState.from.selectedFromId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: { target: any }) => {
        const id: string = e.target.value.split(' ')[1]

        typeof handleSelected === 'function' && handleSelected(id);
    }

    return (
        // <div className="w-full space-y-3">
        <div>
            <Label text={label} isRequired />
            <select
                ref={selectRef}
                name={name}
                className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                onClick={handleClick}
                onChange={handleChange}
            >
                <option>{defaultOptionValue ?? "Choose From"}</option>
                {state.length ? state.map((fr) => (
                    <option key={fr.id} value={`${fr.name} ${fr.id}`}>{fr.name}</option>
                )) : (<option>{empty ?? "No From Exist"}</option>)}
            </select>
        </div>

        // {/* <div>
        //     <Label text="To" isRequired />
        //     <select name="to" className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
        //         <option>Choose From</option>
        //         {state.to.length ? state.to.map((v) => (
        //             <option key={v.locationID} value={`${v.locationName} ${v.locationID}`} id="nothing">{v.locationName}</option>
        //         )) : (<option>No Destination Exist</option>)}
        //     </select>
        // </div> */}
        // </div>
    )
}