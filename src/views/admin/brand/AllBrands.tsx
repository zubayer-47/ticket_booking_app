import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquareFill } from 'react-icons/bs';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { BgNoneButton, MiniButton } from "../../../components/Buttons/Button";
import Error from "../../../components/Error";
import Input from "../../../components/Inputs/Inputs";
import { FormType, InputType } from "../../../types/custom";
import { IdNameBrandLocationFromType } from "../../../types/state.types";
import { api } from "../../../utils/axios";

export default function AllBrands() {
    const [brands, setBrands] = useState<IdNameBrandLocationFromType[]>([]);
    const [brandName, setBrandName] = useState('');
    const [create, setCreate] = useState(false);
    const [updatedBrandId, setUpdatedBrandId] = useState<string | null>(null);
    const [state, setState] = useState<{ error: string, loading: boolean }>({
        error: '',
        loading: false
    });

    useEffect(() => {
        console.log("rendering")

        const controller = new AbortController()

        const fetchBrands = async function () {
            try {

                const response = await api.get('/brand', { signal: controller.signal });

                setBrands(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message

                    setState((prev) => ({
                        ...prev,
                        error: message
                    }))
                    return
                }
                setState(() => ({
                    loading: false,
                    error: 'Something Went Wrong! Please Try Again.'
                }))
            }
            setState((prev) => ({
                ...prev,
                loading: false,
            }))
        }

        setState(prev => ({
            ...prev,
            loading: true
        }))
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

                setState(prev => ({
                    ...prev,
                    error: message
                }))
                return
            }
            setState(prev => ({
                ...prev,
                error: 'Something Went Wrong! Please Try Again.'
            }))
        }
    }

    const handleBrandCreate = async (e: FormType) => {
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

            setCreate(false)
            setBrands(prev => [{ id: response.data?.id, name: response.data?.name }, ...prev])
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setState(prev => ({
                    ...prev,
                    error: message
                }))
                return
            }
            setState(prev => ({
                ...prev,
                error: 'Something Went Wrong! Please Try Again.'
            }))
        }
    }

    const handleDelete = async (brandId: string) => {
        try {
            await api.delete(`/brand/${brandId}`)

            setUpdatedBrandId(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setState(prev => ({
                    ...prev,
                    error: message
                }))
                return
            }
            setState(prev => ({
                ...prev,
                error: 'Something Went Wrong! Please Try Again.'
            }))
        }
    }

    const handleCreateProduct = () => {
        console.log(brands)
    }

    return (
        <div className="max-w-2xl mx-5 md:mx-auto">
            <div className="flex items-center justify-between w-full mt-5">
                <span className="text-2xl text-emerald-500">Bus List</span>
                <button type="button" onClick={() => setCreate(true)}><BsPlusSquareFill className="bg-white text-emerald-500 text-2xl" /></button>
            </div>

            <div className="mb-3 mt-2">
                {/* create add list modal */}
                {create ? (
                    <form className="flex items-center gap-2 mt-2" onSubmit={handleBrandCreate}>
                        <Input
                            name="name"
                            placeholder="Bus Name"
                            defaultSize
                            error={state.error}
                        />

                        <MiniButton
                            text="Add"
                            type="submit"
                            isError={!!state.error?.length}
                        />
                        <BgNoneButton
                            red
                            text="Cancel"
                            handler={() => {
                                setCreate(false)
                                setState(prev => ({
                                    ...prev,
                                    error: ""
                                }))
                            }}
                            isError={!!state.error?.length}
                        />
                    </form>
                ) : null}
            </div>

            <ul className="overflow-hidden scrollbar-none">
                {state.loading ? (<h1>Loading...</h1>) : (
                    <>
                        {
                            !brands.length ? (<h1>Bus List Empty</h1>) : brands.map(brand => (
                                <li className={`flex gap-2 ${updatedBrandId === brand.id ? "border-none" : "border-b"}`} key={brand.id}>
                                    <button className="flex-1">
                                        <input
                                            onClick={handleCreateProduct}
                                            type="text"
                                            defaultValue={updatedBrandId === brand.id && brandName || brand.name || ""}
                                            // value={updatedBrandId === brand.id && brandName || ""}
                                            onChange={handleChange}
                                            className={`bg-transparent text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-5 outline-none ${updatedBrandId === brand.id ? 'border' : 'border-none'}`}
                                            disabled={updatedBrandId !== brand.id}
                                        />
                                        {(updatedBrandId === brand.id && state.error) ? (
                                            <Error error={state.error} />
                                        ) : null}
                                    </button>

                                    {
                                        updatedBrandId !== brand.id ? (
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => handleDelete(brand.id)}>
                                                    <FiTrash2 className="text-2xl text-red-500" />
                                                </button>
                                                <button type="button" onClick={() => handleEdit(brand.id)}>
                                                    <FiEdit className="text-xl text-emerald-600" />
                                                </button>
                                            </div>
                                        ) :
                                            (
                                                <div className="flex justify-center items-center gap-2 mb-6">
                                                    <MiniButton
                                                        text="Update"
                                                        handler={handleUpdate}
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
        </div>
    )
}
