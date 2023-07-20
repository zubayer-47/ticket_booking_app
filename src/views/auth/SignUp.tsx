import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { MiniSelect } from "../../components/common/Select";
import { Context } from "../../contexts/Context";
import { FormType } from "../../types/custom";
import { api } from "../../utils/axios";
import setLocalStorage from "../../utils/setLocalStorage";

export default function SignUp() {
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        common: ''
    });
    const navigate = useNavigate();

    const { dispatch } = useContext(Context)

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
            }));

            setLocalStorage(response.data?.token)

            dispatch({
                type: "ADD_USER", payload: {
                    name: response.data?.fullname,
                    email: response.data?.email,
                    authenticated: true,
                    role: response.data?.role,
                    token: response.data?.token,
                    ticket: response.data?.ticket
                }
            })

            if (response.data?.role === 'user') {
                navigate('/profile', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                setError(message)
                return
            }
            setError(prev => ({
                ...prev,
                common: 'Something Went Wrong! Please Try Again.'
            }))
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
                    <MiniSelect label="Role" name="role">
                        <option>Select Role</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </MiniSelect>
                </div>

                <SubmitButton text="Create Account" />


            </form >

            <Link to={'/sign-in'} className="text-emerald-500 text-lg">Login Account</Link>
        </CenterLayout >
    )
}
