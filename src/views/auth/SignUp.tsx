import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import Label from "../../components/Inputs/Label";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";
import axios from "../../utils/axios";

export default function SignUp() {
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',
        common: ''
    });
    const navigate = useNavigate();

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
            const response = await axios.post('/users/signup', JSON.stringify({
                fullname: body.name,
                email: body.email,
                password: body.password,
                role: body.role
            }))

            if (response.status === 200) {

                console.log(response.data?.role)

                if (response.data?.role === 'user') {
                    navigate('/profile', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            setError(prev => ({
                ...prev,
                common: error?.response?.data?.email
            }))
            console.log(error)
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
                    <select className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="role" required>
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
