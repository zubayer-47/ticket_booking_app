import { useContext } from "react";
import { Action } from "../../constants/context-constant";
import { Context } from "../../contexts/Context";
import { ClickHandler } from "../../types/custom";
import { BrandType, FromType, LocationType, ToType } from "../../types/state.types";
import Label from "../Inputs/Label";

type SelectProps = {
    state: ToType[] | FromType[] | BrandType[] | LocationType[];
    name: string;
    label: string
    handleSelected?: ClickHandler;
    defaultOptionValue?: string;
    empty?: string
}

// give it a detailed name later
// eslint-disable-next-line no-empty-pattern
export default function Select({ name, label, state, handleSelected, defaultOptionValue, empty }: SelectProps) {
    const { dispatch } = useContext(Context);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value.split(' ')[1]


        if (name === 'from' && id) {
            console.log(id)
            dispatch({ type: Action.ADD_FROM_ID, payload: id })
            return
        }

        dispatch({ type: Action.ADD_BRAND_ID, payload: id })
    }

    return (
        // <div className="w-full space-y-3">
        <div>
            <Label text={label} isRequired />
            <select name={name} className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" onClick={handleSelected} onChange={handleChange}>
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