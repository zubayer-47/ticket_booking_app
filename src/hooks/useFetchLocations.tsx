import axios from 'axios';
import { useEffect, useState } from 'react';
import { IdNameBrandLocationFromType } from '../types/state.types';
import api from '../utils/axios';

export interface LocationsType {
    error: string;
    loading: boolean;
    list: IdNameBrandLocationFromType[];
}

export default function useFetchLocations() {
    const [locations, setLocations] = useState<LocationsType>({ error: "", list: [], loading: false })

    useEffect(() => {
        const controller = new AbortController();

        // fetch locations
        const getLocations = () => {
            const fetchTo = async () => {
                setLocations((prev) => ({
                    ...prev,
                    loading: true,
                }));
                try {
                    const res = await api.get('/location', { signal: controller.signal });

                    setLocations((prev) => ({
                        ...prev,
                        list: res.data,
                    }));
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        const message = error.response?.data?.message;

                        setLocations((prev) => ({
                            ...prev,
                            error: message,
                        }));
                        return;
                    }
                    setLocations((prev) => ({
                        ...prev,
                        error: 'Something Went Wrong! Please Try Again.',
                    }));
                }
                setLocations((prev) => ({
                    ...prev,
                    loading: false,
                }));
            };

            fetchTo();
        };

        getLocations();
        return () => controller.abort();
    }, []);

    return [locations];
}
