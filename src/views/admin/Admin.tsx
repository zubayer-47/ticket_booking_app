import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";
import { api } from "../../utils/axios";

export default function Admin() {
    const [, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        const response = { status: 200 } || api.post('url', JSON.stringify(body));

        if (response?.status === 200) {
            setError('')
            return navigate('/profile', { replace: true })
        }

        setError('Something Went Wrong! Please Try Again...')
    }
    return (
        <CenterLayout>
            <form onSubmit={handleSubmit} className="space-y-4 mb-3">
                <Input
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    isRequired
                    placeholder="example@zubayer.com"
                    defaultSize
                />
                <PasswordInput />

                <SubmitButton text="Admin Login" />

            </form>
        </CenterLayout>
    )
}
