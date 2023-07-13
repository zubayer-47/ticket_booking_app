import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";
import { api } from "../../utils/axios";

export default function Create() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('brand')
        }

        try {
            const response = await api.post('/brand', JSON.stringify({
                name: body.name
            }))

            if (response.status === 200) {
                //    set the state here for brand
                console.log(response)

                navigate('/brand/all')
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log(error, "create brand")
                const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                setError(message)
            }
        }

        try {
            const response = await api.post('/brand', JSON.stringify({
                name: body.name
            }))

            if (response.status === 200) {
                //    set the state here for brand
                console.log(response)

                navigate('/brand/all')
            }

        } catch (error) {

            if (axios.isAxiosError(error)) {
                console.log(error, "create brand")
                const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                setError(message)
            }
        }
    }

    return (
        <CenterLayout>
            <h1 className="text-2xl text-emerald-500 text-center font-bold">Create Brand</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-3">
                <Input
                    id="brand"
                    name="brand"
                    label="Brand Name"
                    isRequired
                    placeholder="write brand name"
                    defaultSize
                />

                <SubmitButton
                    text="Create"
                />
            </form>

            {error ? (
                <Error error={error} />
            ) : null}
        </CenterLayout>
    )
}
