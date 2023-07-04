import { Outlet } from "react-router-dom";
import Booking from "../components/Booking";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="mx-5 lg:max-w-4xl lg:mx-auto xl:max-w-5xl border p-2 rounded-md">
                <Booking />

                <Outlet />
            </div>
        </>
    )
}
