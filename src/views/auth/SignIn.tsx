import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";
import axios from "../../utils/axios";

export default function SignIn() {
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    console.dir(location)

    const handleSubmit = async (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        try {
            const response = await axios.post('/users/signin', JSON.stringify({
                email: body.email,
                password: body.password
            }))

            if (response.status === 401) {
                setError("User Unauthorized! Please Try Again.")
            }

            if (response.status === 200) {

                console.log(response.data?.role)

                if (response.data?.role === 'user') {
                    navigate('/profile', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
            }
        } catch (error) {
            setError('Something Went Wrong! Please Try Again.')
            console.log(error)
        }
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

                <SubmitButton text="Login Account" />

            </form>

            <Link to={'/sign-up'} className="text-emerald-500">Create Account</Link>
            {error && (
                <Error error={error} />
            )}
        </CenterLayout>
    )
}
