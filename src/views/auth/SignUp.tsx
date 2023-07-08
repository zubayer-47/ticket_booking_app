import { Link } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";

export default function SignUp() {

    const handleSubmit = (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            confirmPassword: formData.get('confirmPassword'),
            password: formData.get('password'),
        }

        console.log(body)
    }

    return (
        <CenterLayout>
            <form onSubmit={handleSubmit} className="space-y-4 mb-3">
                <Input
                    label="Full Name"
                    name="name"
                    id="name"
                    isRequired
                    placeholder="your full name"
                    defaultSize
                />
                <Input
                    label="email"
                    name="email"
                    type="email"
                    id="email"
                    isRequired
                    placeholder="example@zubayer.com"
                    defaultSize
                />
                <PasswordInput />
                <PasswordInput id="confirmPassword" text="Confirm Password" />

                <SubmitButton text="Create Account" />
            </form>

            <Link to={'/sign-in'} className="text-emerald-500 text-lg">Login Account</Link>
        </CenterLayout>
    )
}
