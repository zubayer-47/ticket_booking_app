import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import Label from "../../components/Inputs/Label";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { Context } from "../../contexts/Context";
import { FormType } from "../../types/custom";
import { api } from "../../utils/axios";

export default function SignUp() {
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        common: ''
    });
    const navigate = useNavigate();

    const { login, logout } = useContext(Context)

    const handleSubmit = async (e: FormType) => {
        e.preventDefault();


        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            confirmPassword: formData.get('confirmPassword'),
            password: formData.get('password'),
            role: formData.get('role')
        }

        if (body.password !== body.confirmPassword) {
            setError(prev => ({
                ...prev,
                password: "password doesn't matched!"
            }))

            return
        }

        try {
            const response = await api.post('/users/signup', JSON.stringify({
                fullname: body.name,
                email: body.email,
                password: body.password,
                role: body.role
            }))

            if (response.status === 200) {
                login({
                    name: response.data?.fullname,
                    email: response.data?.email,
                    authenticated: true,
                    role: response.data?.role,
                    token: response.data?.token,
                })

                if (response.data?.role === 'user') {
                    navigate('/profile', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
            } else {
                logout()
                setError(prev => ({
                    ...prev,
                    common: "something went wrong! please try again..."
                }))
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {

            if (axios.isAxiosError(error)) {
                logout()
                const message = error?.response?.data?.message || 'Something Went Wrong! Please Try Again.';

                setError(message)
            }
        }

    }

    return (
        <CenterLayout>
            <form onSubmit={handleSubmit} className="space-y-4 mb-3">

                <Error error={error.common} />
                <Input
                    label="Full Name"
                    name="name"
                    id="name"
                    isRequired
                    placeholder="your full name"
                    defaultSize
                    error={error.name}
                />
                <Input
                    label="email"
                    name="email"
                    type="email"
                    id="email"
                    isRequired
                    placeholder="example@zubayer.com"
                    defaultSize
                    error={error.email}
                />
                <PasswordInput error={error.password} />
                <PasswordInput id="confirmPassword" text="Confirm Password" error={error.password} />

                <div>
                    <Label text="Role" isRequired id="role" />
                    <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="role" required defaultValue=''>
                        <option selected>Select Role</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>

                <SubmitButton text="Create Account" />


            </form>

            <Link to={'/sign-in'} className="text-emerald-500 text-lg">Login Account</Link>
        </CenterLayout>
    )
}
