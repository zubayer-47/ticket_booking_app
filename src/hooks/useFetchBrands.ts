import axios from "axios";
import { useEffect, useState } from "react";
import { IdNameBrandLocationFromType } from "../types/state.types";
import api from "../utils/axios";

export interface BrandsType {
  error: string;
  loading: boolean;
  list: IdNameBrandLocationFromType[];
}

export default function useFetchBrands() {
  const [brands, setBrands] = useState<BrandsType>({
    error: "",
    list: [],
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    // fetch brands
    const fetchTo = async () => {
      setBrands((prev) => ({
        ...prev,
        loading: true,
      }));
      try {
        const res = await api.get("/brand/", { signal: controller.signal });

        setBrands((prev) => ({
          ...prev,
          list: res.data,
        }));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;

          setBrands((prev) => ({
            ...prev,
            error: message,
          }));
          return;
        }
        setBrands((prev) => ({
          ...prev,
          error: "Something Went Wrong! Please Try Again.",
        }));
      }
      setBrands((prev) => ({
        ...prev,
        loading: false,
      }));
    };

    fetchTo();
    return () => controller.abort();
  }, []);

  return { brandsState: { ...brands } };
}
