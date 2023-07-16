import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/Context";
import { api } from "../../utils/axios";
import Label from "../Inputs/Label";

// give it a detailed name later
export default function Select() {
    const [error, setError] = useState('')
    const [selectedFromId, setSelectedFromId] = useState('')
    const { state, addFrom, removeFrom, addTo, removeTo } = useContext(Context);

    useEffect(() => {
        const controller = new AbortController();

        const getAllFrom = async () => {
            try {
                const res = await api.get('/search/fromLocation', { signal: controller.signal });

                if (res.status === 200) {
                    addFrom(res.data?.location)
                }
            } catch (error) {
                removeFrom();
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setError(message)
                    return
                }
                setError('Something Went Wrong! Please Try Again.')
            }
        }

        getAllFrom()

        return () => controller.abort();
    }, [addFrom, removeFrom])

    const getToBasedOnFrom = () => {

        const fetchTo = async () => {
            try {
                const res = await api.get(`/search/toLocation/${selectedFromId}`);

                if (res.status === 200) {
                    addTo(res.data)
                }
            } catch (error) {
                removeTo();
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setError(message)
                    return
                }
                setError('Something Went Wrong! Please Try Again.')
            }
        }

        fetchTo()
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value.split(' ')[1]
        setSelectedFromId(id);
    }

    return (
        <div className="w-full space-y-3">
            <div>
                <Label text="From" isRequired />
                <select name="from" className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" onClick={getToBasedOnFrom} onChange={handleSelect}>
                    <option selected>Choose From</option>
                    {state.from.length ? state.from.map((fr) => (
                        <option key={fr.id} value={`${fr.name} ${fr.id}`}>{fr.name}</option>
                    )) : (<h1>No From Exist</h1>)}
                </select>
            </div>

            <div>
                <Label text="To" isRequired />
                <select name="to" className="bg-white outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5">
                    <option selected>Choose From</option>
                    {state.to.length ? state.to.map((v) => (
                        <option key={v.locationID} value={`${v.locationName} ${v.locationID}`}>{v.locationName}</option>
                    )) : (<h1>No Destination Exist</h1>)}
                </select>
            </div>
        </div>
    )
}






























// import AsyncSelect from 'react-select/async';
// import { api } from '../../utils/axios';

// const colorOptions = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]

// const filterColors = (inputValue: string) => {
//     return colorOptions.filter((i) =>
//         i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
// };

// type DataType = { id: string; name: string }

// const fetchData = async (): Promise<DataType[]> => {
//     const data = []
//     try {
//         const res: { data: { location: DataType[] } } = await api.get('/search/fromLocation')

//         data.push(...res.data.location)
//     } catch (error) {
//         console.log(error, 'from asyncSelect')
//     }

//     console.log(data)

//     return data
// }

// const promiseOptions = () =>
//     new Promise<DataType[]>((resolve) => {
//         setTimeout(() => {
//             resolve(fetchData());
//         }, 1000);
//     });

// // fetch here
// // console.log(inputValue)
// // eslint-disable-next-line @typescript-eslint/no-explicit-any

// export default function Select({ name }: { name: string }) {

//     return <AsyncSelect
//         autoFocus
//         onChange={(value) => console.log(value)}
//         className='w-full' styles={{
//             menu: provided => ({ ...provided, zIndex: 20 })
//         }}
//         cacheOptions
//         name={name}
//         defaultOptions
//         loadOptions={promiseOptions}
//     />

// }