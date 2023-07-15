import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquareFill } from 'react-icons/bs';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { BgNoneButton, MiniButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType, InputType } from "../../types/custom";
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

    useEffect(() => {

        console.log("rendering")

        const controller = new AbortController()

        const fetchBrands = async function () {
            try {
                setState(prev => ({
                    ...prev,
                    loading: true
                }))
                const response = await api.get('/brand', { signal: controller.signal });

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

        return () => controller.abort();
    }, []);

    const handleChange = (e: InputType) => {
        setBrandName(e.target.value)
    }

    const handleEdit = (brandId: string) => {
        setUpdatedBrandId(brandId)
        setCreate(false)
    }

    const handleUpdate = async () => {
        try {
            await api.put('/brand', {
                brandID: updatedBrandId,
                name: brandName
            })

            setUpdatedBrandId(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setError(message)
                return
            }
            setError('Something Went Wrong! Please Try Again.')
        }
    }

    const handleSubmit = async (e: FormType) => {
        e.preventDefault();
        // send request for creating brand

        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get('name')
        }

        if (!body.name) {
            alert("write your brand name please")
            return
        }

        try {
            const response = await api.post('/brand', {
                name: body.name
            })

            if (response.status === 200) {
                setCreate(false)
                setBrands(prev => [{ id: response.data?.id, name: response.data?.name }, ...prev])
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setError(message)

                return
            }
            setError('Something Went Wrong! Please Try Again.')
        }
    }

    const handleDelete = () => {
        console.log('')
    }

    return (
        <div>
            <CenterLayout>
                <div className="flex justify-between items-center">

                    <span className="text-2xl text-emerald-500">Bus List</span>
                    <button type="button" onClick={() => setCreate(true)}><BsPlusSquareFill className="bg-white text-emerald-500 text-2xl" /></button>
                </div>

                <div className="mb-3 mt-5">
                    {/* create add list modal */}
                    {create ? (
                        <form className="flex items-center gap-2 mt-2" onSubmit={handleSubmit}>
                            <Input
                                name="name"
                                placeholder="Bus Name"
                                defaultSize
                            />

                            <MiniButton
                                text="Add"
                                type="submit"
                            />
                            <BgNoneButton
                                red
                                text="Cancel"
                                handler={() => {
                                    setCreate(false)
                                    setError("")
                                }}
                            />
                        </form>
                    ) : null}
                </div>


                <ul className="space-y-2 max-h-96 overflow-auto scrollbar-none">
                    {state.loading ? (<h1>Loading...</h1>) : (
                        <>
                            {
                                brands.map(brand => (
                                    <li className={`flex gap-2 ${updatedBrandId === brand.id ? "border-none" : "border-b"}`} key={brand.id}>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                defaultValue={updatedBrandId === brand.id && brandName || brand.name || ""}
                                                // value={updatedBrandId === brand.id && brandName || ""}
                                                onChange={handleChange}
                                                className={`bg-transparent text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none ${updatedBrandId === brand.id ? 'border' : 'border-none'}`}
                                                disabled={updatedBrandId !== brand.id}
                                            />
                                            {(updatedBrandId === brand.id && error) ? (
                                                <Error error={error} />
                                            ) : null}
                                        </div>

                                        {
                                            updatedBrandId !== brand.id ? (
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={() => handleDelete()}>
                                                        <FiTrash2 className="text-2xl text-red-500" />
                                                    </button>
                                                    <button type="button" onClick={() => handleEdit(brand.id)}>
                                                        <FiEdit className="text-xl text-emerald-600" />
                                                    </button>
                                                </div>
                                            ) :
                                                (
                                                    <div className="flex justify-center items-center gap-2">
                                                        <MiniButton
                                                            text="Update"
                                                            handler={handleUpdate}
                                                            type="submit"
                                                        />
                                                        <BgNoneButton
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