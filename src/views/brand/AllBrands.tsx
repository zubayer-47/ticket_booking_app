import axios from "axios";
import { useEffect, useState } from "react";
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
    const [updatedBrandId, setUpdatedBrandId] = useState<string | null>(null);
    const [state, setState] = useState({
        error: '',
        loading: false
    });
    const navigate = useNavigate();

    useEffect(() => {

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

    return (
        <div>
            <CenterLayout>
                <ul className="space-y-2">
                    {state.loading ? (<h1>Loading...</h1>) : (
                        <>
                            {
                                brands.map(brand => (
                                    <li className="flex gap-2" key={brand.id}>
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={updatedBrandId === brand.id && brandName || brand.name || ""}
                                                onChange={handleChange}
                                                className={`bg-transparent text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none ${updatedBrandId === brand.id ? 'border' : 'border-none'}`}
                                                disabled={updatedBrandId !== brand.id}
                                            />
                                            {error ? (
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
