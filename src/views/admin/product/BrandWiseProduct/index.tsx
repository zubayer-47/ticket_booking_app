import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { BgNoneButton, MiniButton } from "../../../../components/Buttons/Button";
import Error from "../../../../components/Error";
import CommonInput from "../../../../components/Inputs/CommonInput";
import Input from "../../../../components/Inputs/Inputs";
import { InputType } from "../../../../types/custom";
import { IdNameBrandLocationFromType } from "../../../../types/state.types";
import api from "../../../../utils/axios";

// {
//     "id": "478386bf-4079-496d-a346-b4d674e85611",
//     "location": {
//       "id": "29e0fa71-4add-4153-99e4-184a13c56f78",
//       "name": "dhaka"
//     },
//     "journey_date": "2023-07-20T18:00:00.000Z",
//     "type": "AC"
//   }


interface ProductType {
    id: string;
    location: IdNameBrandLocationFromType,
    journey_date: string;
    type: string;
}

interface ProductStateType {
    productList: ProductType[],
    prodName: string;
    loading: boolean;
    error: string;
}

export default function BrandWiseProduct() {
    const { id } = useParams();
    const [createProduct, setCreateProduct] = useState(false);
    const [updatedBrandId, setUpdatedBrandId] = useState<string | null>(null);
    const [productState, setProductState] = useState<ProductStateType>({
        error: "",
        loading: false,
        prodName: "",
        productList: [
            {
                id: "",
                journey_date: "",
                location: { id: "", name: "" },
                type: ""
            },
        ]
    })

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/product/${id}`, { signal: controller.signal });

                setProductState(prev => ({
                    ...prev,
                    loading: false,
                    productList: res.data
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message;
                    return;
                }
            }
        }

        fetchProducts()

        return () => controller.abort();
    }, [id])

    const handleCreateProduct = () => {
        console.log('create product')
    }

    const handleChange = (e: InputType) => {
        setProductState(prev => ({
            ...prev,
            prodName: e.target.value
        }))
    };

    const handleDelete = async (brandId: string) => {
        console.log('delete prod')
    };

    const handleEdit = async (brandId: string) => {
        console.log('edit prod')
    };
    const handleUpdate = async () => {
        console.log('update prod')
    };

    return (
        <div className='max-w-2xl mx-5 md:mx-auto'>
            <div className='flex items-center justify-between w-full mt-5'>
                <span className='text-2xl text-emerald-500 font-bold'>Product List</span>
                <button type='button' onClick={() => setCreateProduct(true)}>
                    <BsPlusSquareFill className='bg-white text-emerald-500 text-2xl' />
                </button>
            </div>

            <div className='mb-3 mt-2'>
                {/* create add list modal */}
                {createProduct ? (
                    <form
                        className='flex items-center gap-2 mt-2'
                    // onSubmit={handleBrandCreate}
                    >
                        <Input
                            name='name'
                            placeholder='Bus Name'
                            defaultSize
                        // error={state.error}
                        />

                        <CommonInput
                            change={() => {
                                console.log('changes')
                            }}
                            value=''
                        />

                        <MiniButton
                            text='Add'
                            type='submit'
                        // isError={!!state.error?.length}
                        />
                        <BgNoneButton
                            red
                            text='Cancel'
                            handler={() => {
                                setCreateProduct(false);
                                // setState((prev) => ({
                                //     ...prev,
                                //     error: '',
                                // }));
                            }}
                        // isError={!!state.error?.length}
                        />
                    </form>
                ) : null}
            </div>

            <ul className='overflow-hidden scrollbar-none'>
                {productState.loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        {!productState.productList.length ? (
                            <h1>Product List Empty</h1>
                        ) : (
                            productState.productList.map((prod) => (
                                <li
                                    className={`flex items-stretch gap-2 cursor-pointer ${updatedBrandId === prod.id ? 'border-none' : 'border-b'
                                        }`}
                                    key={prod.id}
                                >
                                    <div className='flex-1'>
                                        <input
                                            onClick={handleCreateProduct}
                                            type='text'
                                            defaultValue={
                                                (updatedBrandId === prod.id && productState.prodName) || ''}
                                            // value={updatedBrandId === brand.id && brandName || ""}
                                            onChange={handleChange}
                                            className={`bg-transparent text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-5 outline-none ${updatedBrandId === prod.id ? 'border' : 'border-none'
                                                }`}
                                            disabled={updatedBrandId !== prod.id}
                                        />
                                        {updatedBrandId === prod.id && productState.error ? (
                                            <Error error={productState.error} />
                                        ) : null}
                                    </div>

                                    {updatedBrandId !== prod.id ? (
                                        <div className='flex gap-2'>
                                            <button
                                                type='button'
                                                onClick={() => handleDelete(prod.id)}
                                            >
                                                <FiTrash2 className='text-2xl text-red-500' />
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => handleEdit(prod.id)}
                                            >
                                                <FiEdit className='text-xl text-emerald-600' />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center gap-2 mb-6'>
                                            <MiniButton text='Update' handler={handleUpdate} />
                                            <BgNoneButton
                                                red
                                                text='Cancel'
                                                handler={() => setUpdatedBrandId(null)}
                                            />
                                        </div>
                                    )}
                                </li>
                            ))
                        )}
                    </>
                )}
            </ul>
        </div>
    )
}
