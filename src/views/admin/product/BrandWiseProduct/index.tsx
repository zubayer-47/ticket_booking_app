import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import FromModal from "../../../../components/ModalViews/FromModal/FromModal";
import useFetchLocations from "../../../../hooks/useFetchLocations";
import { InputSelectChangeType } from "../../../../types/custom";
import { IdNameBrandLocationFromType } from "../../../../types/state.types";
import api from "../../../../utils/axios";
import { makeCoachName } from "../../../../utils/coachName";
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

export interface FromStateTypes {
    id: string;
    productID: string;
    ticketPrice: number;
    locationID: string;
}

export default function BrandWiseProduct() {
    const { brandID } = useParams();
    const location = useLocation();
    const brandName = location.state?.brandName;
    const [productID, setProductID] = useState('');
    const [editProductModal, setEditProductModal] = useState(false);
    // const [updatedProductID, setUpdatedProductID] = useState<string | null>(null);
    const { locations } = useFetchLocations();
    const [froms, setFroms] = useState<FromStateTypes[]>([]);
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
                    productList: res.data
                }))
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // const message = error.response?.data?.message;
                    // return;
                }
            }

            setProductState(prev => ({
                ...prev,
                loading: false,
            }))
        }

        setProductState(prev => ({
            ...prev,
            loading: true
        }))
        fetchProducts();

        return () => controller.abort();
    }, [brandID, productState.productList.length]);

    useEffect(() => {
        console.log(productState.loading, 'loading test')
    }, [productState.loading])

    const handleDelete = async (brandId: string) => {
        console.log(brandId)
    };

    const handleEdit = async (prodID: string) => {

        setProductID(prodID);

        setEditProductModal(true)
    };

    const createFromLocations = () => {
        // set froms
        const id = uuidv4();
        setFroms((prev) => [...prev, { id, locationID: '', ticketPrice: 0, productID: '' }]);
    };

    const handleFromSelectChange = (e: InputSelectChangeType, fromID: string) => {
        setFroms(prev => {
            const clone = [...prev];
            const fromIndex = clone.findIndex(d => d.id === fromID);

            if (e.target.name === 'from-loc')
                clone[fromIndex].locationID = e.target.value
            else
                clone[fromIndex].ticketPrice = +e.target.value;

            clone[fromIndex].productID = productID;
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
                    locations={locations.list}
                    createFromLocations={createFromLocations}
                    showModal={editProductModal}
                    setShowModal={setEditProductModal}
                    setFroms={setFroms}
                    deleteFromLocations={deleteFromLocations}
                    handleChange={handleFromSelectChange}
                />
            )}
            <div className='max-w-2xl mx-5 md:mx-auto'>
                <span className='text-2xl text-emerald-500 font-bold'>Product List</span>

                <table className='text-center w-full border-collapse border border-gray-100'>
                    <thead className='w-full'>
                        <tr className=' bg-emerald-500 text-white flex items-center'>
                            <th className='py-1.5 flex-1 flex-shrink-0'>Coach No</th>
                            <th className='py-1.5 flex-1 flex-shrink-0'>To</th>
                            <th className='py-1.5 flex-1 flex-shrink-0'>Journey Date</th>
                            <th className='py-1.5 flex-1 flex-shrink-0'>Coach Type</th>
                            <th className='py-1.5 flex-1 flex-shrink-0'></th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {productState.loading ? (<tr><td>Loading...</td></tr>) : !productState.productList.length ? (<tr><td>Coach List Empty</td></tr>) : productState.productList.map((prod) => (
                            <tr className='flex items-center border' key={prod.id}>
                                <td className='py-3 px-2 flex-1 flex-shrink-0'>{makeCoachName(prod.id, brandName)}</td>
                                <td className='py-3 px-2 flex-1 flex-shrink-0'>
                                    {prod.location.name}
                                </td>
                                <td className='py-3 px-2 flex-1 flex-shrink-0'>
                                    {dayjs(prod.journey_date).format('DD-MM-YYYY')}
                                </td>
                                <td className='py-3 px-2 flex-1 flex-shrink-0 capitalize'>{prod.type}</td>
                                <td className='py-3 px-2 flex-1 flex-shrink-0'>
                                    <div className='flex gap-5 justify-end'>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <ul className='overflow-hidden scrollbar-none'>
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
                                                <span>{
                                                    (updatedProductID === prod.id && makeCoachName(prod.id, brandName)) || makeCoachName(prod.id, brandName) || ''}</span>
                                                <span>{prod.location.name}</span>
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
                </ul> */}
            </div>
        </>
    )
}
