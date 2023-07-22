import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
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
    loading: boolean;
    error: string;
}

export default function BrandWiseProduct() {
    const { id } = useParams();
    const [createProduct, setCreateProduct] = useState(false);
    const [productState, setProductState] = useState<ProductStateType>()

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                const res = await api.get(`/product/${id}`, { signal: controller.signal });

                // setProductState(prev => ({
                //     ...prev,
                //     productList: 
                // }))

                console.log(res.data)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error.response?.data?.message;
                    return;
                }
            }
        }

        fetchProducts()

        return () => controller.abort();
    }, [])

    return (
        <div className='max-w-2xl mx-5 md:mx-auto'>
            <div className='flex items-center justify-between w-full mt-5'>
                <span className='text-2xl text-emerald-500 font-bold'>Product List</span>
                <button type='button' onClick={() => setCreateProduct(true)}>
                    <BsPlusSquareFill className='bg-white text-emerald-500 text-2xl' />
                </button>
            </div>
        </div>
    )
}
