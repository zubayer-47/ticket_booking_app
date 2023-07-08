import { Outlet } from "react-router-dom";
import Booking from "../components/Booking";

export default function Home() {
    return (
        <>
            <div className="mx-5 max-w-full lg:max-w-4xl lg:mx-auto xl:max-w-5xl border p-2 shadow-md rounded-xl">
                <Booking />

                <Outlet />
            </div>
        </>
    )
}
