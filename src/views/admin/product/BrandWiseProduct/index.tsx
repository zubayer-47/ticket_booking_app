import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Error from "../../../../components/Error";
import FromModal from "../../../../components/ModalViews/FromModal/FromModal";
import useFetchLocations from "../../../../hooks/useFetchLocations";
import { InputSelectChangeType } from "../../../../types/custom";
import { IdNameBrandLocationFromType } from "../../../../types/state.types";
import api from "../../../../utils/axios";
import { makeCoachName } from "../../../../utils/coachName";
import { FromStateType } from "../Create";

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
    loading: boolean;
    error: string;
}

export default function BrandWiseProduct() {
    const { brandID } = useParams();
    const location = useLocation();
    const brandName = location.state?.brandName;
    const [editProductModal, setEditProductModal] = useState(false);
    const [updatedProductID, setUpdatedProductID] = useState<string | null>(null);
    const [froms, setFroms] = useState<FromStateType[]>([]);
    const [locations] = useFetchLocations();
    const [productState, setProductState] = useState<ProductStateType>({
        error: "",
        loading: false,
        productList: [
            {
                id: "",
                journey_date: "",
                location: { id: "", name: "" },
                type: ""
            },
        ]
    });

    useEffect(() => {
        console.log('rendering brandwiseproduct')
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/product/${brandID}`, { signal: controller.signal });

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
    }, [brandID, productState.productList.length])

    const handleCreateProduct = () => {
        console.log('create product')
    }

    const handleDelete = async (brandId: string) => {
        console.log('delete prod')
    };

    const handleEdit = async (prodID: string) => {
        setEditProductModal(true)
        setUpdatedProductID(prodID)
    };
    const handleUpdate = async () => {
        console.log('update prod')
    };

    const createFromLocations = () => {
        // set froms
        const id = uuidv4();
        setFroms((prev) => [...prev, { id, location: '', price: 0 }]);
    };

    const handleFromSelectChange = (e: InputSelectChangeType, fromID: string) => {
        setFroms(prev => {
            const clone = [...prev];
            const data = clone.findIndex(d => d.id === fromID);

            if (e.target.name === 'from-loc') {
                clone[data].location = e.target.value
            }

            clone[data].price = +e.target.value;

            return clone;
        })
    }

    const deleteFromLocations = (id: string) =>
        setFroms((prev) => prev.filter((v) => v.id !== id));

    return (
        <>
            {!editProductModal ? null : (
                <FromModal
                    froms={froms}
                    createFromLocations={createFromLocations}
                    locations={locations.list}
                    showModal={editProductModal}
                    setShowModal={setEditProductModal}
                    deleteFromLocations={deleteFromLocations}
                    handleChange={handleFromSelectChange}
                />
            )}
            <div className='max-w-2xl mx-5 md:mx-auto'>
                {/* <div className='flex items-center justify-between w-full mt-5'> */}
                <span className='text-2xl text-emerald-500 font-bold'>Product List</span>
                {/* 
                <BgNoneButton
                    text='Add From Locations'
                    handler={createFromLocations}
                    classNames='border border-emerald-600 px-5 text-emerald-600 mb-2'
                /> */}

                {/* <button type='button' onClick={() => setCreateProduct(true)}>
                    <BsPlusSquareFill className='bg-white text-emerald-500 text-2xl' />
                </button> */}
                {/* </div> */}

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
                                        className={`flex items-stretch gap-2 select-none ${updatedProductID === prod.id ? 'border-none' : 'border-b'
                                            }`}
                                        key={prod.id}
                                    >
                                        <div className='flex-1'>
                                            <p className={`bg-transparent text-gray-900 text-md rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-5 outline-none`}>
                                                {
                                                    (updatedProductID === prod.id && makeCoachName(prod.id, brandName)) || makeCoachName(prod.id, brandName) || ''}
                                            </p>
                                            {updatedProductID === prod.id && productState.error ? (
                                                <Error error={productState.error} />
                                            ) : null}
                                        </div>

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
                                    </li>
                                ))
                            )}
                        </>
                    )}
                </ul>
            </div>
        </>
    )
}
