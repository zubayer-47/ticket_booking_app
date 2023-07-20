import { IdNameBrandLocationFromType, ToType } from "../../types/state.types";

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
}

// give it a detailed name later
export default function FromSelect() {


    return (
        <div></div>
    )





    // const [value, setValue] = useState('');

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleChange = (e: { target: any }) => {
    //     setValue(e.target.value);
    // }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const handleClick = (e: { target: any }) => {
    //     const id: string = e.target?.value.split(' ')[1]

    //     // typeof handleSelected === 'function' && handleSelected(id, e.target?.name);
    // }

    // return (
    //     <div>
    //         <Label text="From" isRequired />
    //         <div className="relative">
    //             <select
    //                 name="from"
    //                 className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
    //                 onClick={handleClick}
    //                 value={value}
    //                 onChange={handleChange}
    //             >
    //                 <option>{(defaultOptionValue ?? "Choose From")}</option>
    //             </select>

    //             {state.loading ? (<p className="absolute top-0 right-5 mt-1.5 text-gray-400 select-none">loading...</p>) : null}
    //         </div>
    //     </div>
    // )
}