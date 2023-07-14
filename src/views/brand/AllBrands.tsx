import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquareFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { MiniButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { InputType } from "../../types/custom";
import { api } from "../../utils/axios";

type BrandType = {
    id: string;
    name: string
}

export default function AllBrands() {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [brandName, setBrandName] = useState('');
    const [error, setError] = useState('');
    const [create, setCreate] = useState(false);
    const [updatedBrandId, setUpdatedBrandId] = useState<string | null>(null);
    const [state, setState] = useState({
        error: '',
        loading: false
    });
    const navigate = useNavigate();

    useEffect(() => {

        console.log("rendering")

        const fetchBrands = async function () {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                const response = await api.get('/brand');

                if (response.status === 200) {
                    setBrands(response.data);
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                }

            } catch (error) {
                setState(prev => ({
                    ...prev,
                    loading: false
                }))
                if (axios.isAxiosError(error)) {
                    const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                    setState(prev => ({
                        ...prev,
                        error: message
                    }))
                }
            }
        }

        fetchBrands();

    }, []);

    const handleChange = (e: InputType) => {
        setBrandName(e.target.value)
    }

    const handleEdit = (brandId: string) => {
        setUpdatedBrandId(brandId)
    }

    const handleUpdate = async () => {
        try {
            const response = await api.put('/brand', {
                brandID: updatedBrandId,
                name: brandName
            })

            if (response.status === 200) {
                setUpdatedBrandId(null);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                setError(message)
            }
        }
    }

    const handleAdd = () => {
        // send request for creating brand
        console.log('adding')
    }

    console.log(brands);

    return (
        <div>
            <CenterLayout>
                <ul className="space-y-2">
                    <li >
                        <div className="flex justify-between items-center border-b pb-2">

                            <span className="text-2xl text-emerald-500">Create </span>
                            <button type="button" onClick={() => setCreate(true)}><BsPlusSquareFill className="bg-white text-emerald-500 text-2xl" /></button>

                        </div>


                        {/* create add list modal */}
                        {create ? (
                            <form className="flex items-center gap-2 mt-2">
                                <input
                                    type="text"
                                    value={brandName}
                                    onChange={handleChange}
                                    className={`bg-transparent text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none border`}
                                // disabled={updatedBrandId !== brand.id}
                                />

                                <MiniButton
                                    text="Create"
                                    handler={handleAdd}
                                    type="submit"
                                />
                                <MiniButton
                                    red
                                    text="Cancel"
                                    handler={() => setCreate(false)}
                                    type="submit"
                                />
                            </form>
                        ) : null}

                    </li>
                    {state.loading ? (<h1>Loading...</h1>) : (
                        <>
                            {
                                brands.map(brand => (
                                    <li className={`flex gap-2 ${updatedBrandId === brand.id ? "border-none" : "border-b"}`} key={brand.id}>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                defaultValue={brand.name}
                                                // value={updatedBrandId === brand.id && brandName || ""}
                                                onChange={handleChange}
                                                className={`bg-transparent text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none ${updatedBrandId === brand.id ? 'border' : 'border-none'}`}
                                                disabled={updatedBrandId !== brand.id}
                                            />
                                            {(updatedBrandId === brand.id && error) ? (
                                                <Error error={error} />
                                            ) : null}
                                        </div>

                                        {
                                            updatedBrandId !== brand.id ? (
                                                <button type="button" onClick={() => handleEdit(brand.id)}>Edit</button>
                                            ) :
                                                (
                                                    <div className="flex justify-center items-center gap-2">
                                                        <MiniButton
                                                            text="Update"
                                                            handler={handleUpdate}
                                                            type="submit"
                                                        />
                                                        <MiniButton
                                                            red
                                                            text="Cancel"
                                                            handler={() => setUpdatedBrandId(null)}
                                                        />
                                                    </div>
                                                )
                                        }
                                    </li>
                                ))
                            }
                        </>
                    )}
                </ul >
            </CenterLayout>
        </div>
    )
}
