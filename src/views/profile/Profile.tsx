import Input, { PasswordInput } from "../../components/Inputs/Inputs";
import { Gender } from "../../components/Selects/Selects";

export default function Profile() {
    return (
        <div>
            <form>
                <Input
                    id="email"
                    label="Email"
                    name="email"
                    isRequired
                    placeholder="example@zubayer.com"
                    type="email"
                />
                <PasswordInput />
                <Input
                    id="name"
                    label="Name"
                    name="name"
                    isRequired
                    placeholder="Your Name"
                />
                <Input
                    id="address"
                    label="Address"
                    name="address"
                    isRequired
                    placeholder="Address"
                />
                <Gender />
                <Input
                    id="age"
                    label="Age"
                    name="age"
                    isRequired
                    placeholder="Age"
                    type="number"
                />
                <Input
                    id='mobile'
                    name='mobile'
                    isRequired
                    label="Mobile"
                    placeholder="01600000000"
                    type="tel"
                />

                <button
                    type="submit"
                    className="bg-emerald-500 text-white mt-2 active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                    Update
                </button>
            </form>
        </div>
    )
}
