import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Error from "../../components/Error";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { Context } from "../../contexts/Context";
import { FormType } from "../../types/custom";
import { api } from "../../utils/axios";

export default function SignIn() {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { dispatch, state } = useContext(Context);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        // const _token = Cookies.get("_token");
        const _token = localStorage.getItem("_token");

        (_token && state.user.authenticated) && navigate(from);
    }, [from, navigate, state.user.authenticated, dispatch])

    const handleSubmit = async (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        try {
            const response = await api.post('/users/signin', JSON.stringify({
                email: body.email,
                password: body.password
            }))

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

            localStorage.setItem("_token", JSON.stringify(response.data?.token));

            if (response.data?.role === 'user') {
                navigate('/profile', { replace: true });
                return
            }

            navigate('/dashboard', { replace: true });
        } catch (error) {

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message

                if (error.status === 401) {
                    setError("User Unauthorized! Please Try Again.")
                }

                setError(message)
                return
            }
            setError('Something Went Wrong! Please Try Again.')
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
            {error ? (
                <Error error={error} />
            ) : null}
        </CenterLayout>
    )
}
