import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../utils/axios";

type BrandType = {
    id: string;
    name: string
}

export default function BrandsList() {
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchBrands = async function () {
            try {
                const response = await api.get('/brand');

                if (response.status === 200) {
                    setBrands(response.data);
                } else {
                    throw new Error("went")
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                    setError(message)
                }
            }
        }

        fetchBrands();

    }, [])

    return (
        <ul>
            {brands.map(brand => (
                <li key={brand.id}>{brand.name}</li>
            ))}
        </ul >
    );
}