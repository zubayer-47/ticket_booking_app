import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LocationsType } from "../components/Booking";
import api from "../utils/axios";

interface ToLocationsTypes {
  error: string;
  loading: boolean;
  list: LocationsType[];
}

export default function useGetToBaseOnFrom(id: string | null) {
  const [toLocations, setToLocations] = useState<ToLocationsTypes>({
    error: "",
    list: [],
    loading: false,
  });

  console.log(id, "from hoook");
  const fetchToLocations = useCallback(async () => {
    setToLocations((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      const res = await api.get(`/search/toLocation/${id}`);
      setToLocations((prev) => ({
        ...prev,
        list: res.data,
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setToLocations((prev) => ({
          ...prev,
          error: message,
        }));
        return;
      }
      setToLocations((prev) => ({
        ...prev,
        error: "Something Went Wrong! Please Try Again.",
      }));
    }

    setToLocations((prev) => ({
      ...prev,
      loading: false,
    }));
  }, [id]);

  useEffect(() => {
    fetchToLocations();
  }, [fetchToLocations]);

  return {
    toLocations: toLocations.list,
    toLocationsError: toLocations.error,
    toLocationsLoading: toLocations.loading,
  };
}
