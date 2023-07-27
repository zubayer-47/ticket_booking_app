import { useContext } from "react";
import { FiUser } from "react-icons/fi";
import CommonInput from "../../components/Inputs/CommonInput";
import CenterLayout from "../../components/Layouts/CenterLayout";
import { Context } from "../../contexts/Context";

export default function Profile() {
    const { state } = useContext(Context)

    return (
        <CenterLayout smWidth>

            <div className="w-full flex justify-center items-center pb-8">
                <FiUser className='text-8xl text-gray-50 rounded-full bg-emerald-500 cursor-pointer p-1' />
            </div>

            <CommonInput
                name="email"
                placeholder="example@zubayer.com"
                type="email"
                change={() => {
                    console.log()
                }}
                value={state.user.email}
                label="Email"
                required
                isLoading
            />
            <CommonInput
                name="name"
                placeholder="your full name"
                type="text"
                change={() => {
                    console.log()
                }}
                value={state.user.name}
                label="Full Name"
                required
                isLoading
            />
        </CenterLayout>
    )
}
