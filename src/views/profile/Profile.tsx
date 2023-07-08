import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import PageLayout from "../../components/Layouts/PageLayout";
import { Gender } from "../../components/Selects/Selects";

export default function Profile() {
    return (
        <PageLayout>
            <form className="space-y-3">
                <Input
                    id="email"
                    label="Email"
                    name="email"
                    isRequired
                    placeholder="example@zubayer.com"
                    type="email"
                    defaultSize
                />
                <PasswordInput />
                <Input
                    id="name"
                    label="Name"
                    name="name"
                    isRequired
                    placeholder="Your Name"
                    defaultSize
                />
                <Input
                    id="address"
                    label="Address"
                    name="address"
                    isRequired
                    placeholder="Address"
                    defaultSize
                />
                <Gender />
                <Input
                    id="age"
                    label="Age"
                    name="age"
                    isRequired
                    placeholder="Age"
                    defaultSize
                    type="number"
                />
                <Input
                    id='mobile'
                    name='mobile'
                    isRequired
                    label="Mobile"
                    placeholder="01600000000"
                    defaultSize
                    type="tel"
                />

                <button
                    type="submit"
                    className="bg-emerald-500 text-white mt-2 active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Update
                </button>
            </form>
        </PageLayout>
    )
}
