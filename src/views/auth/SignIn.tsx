import { Link, useLocation, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../components/Buttons/Button";
import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { FormType } from "../../types/custom";

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();

    console.dir(location)

    const handleSubmit = (e: FormType) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const body = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        console.log(body)
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
                <PasswordInput id="password" />

                <SubmitButton text="Login Account" />
            </form>

            <Link to={'/sign-up'} className="text-emerald-500">Create Account</Link>
        </CenterLayout>
    )
}
