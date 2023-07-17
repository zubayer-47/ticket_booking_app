import { Outlet } from "react-router-dom";
import Booking from "../components/Booking";
import PageLayout from "../components/Layouts/PageLayout";

export default function Home() {
    return (
        <PageLayout>
            <div className="mx-5 max-w-full lg:max-w-4xl lg:mx-auto xl:max-w-5xl border p-2 shadow-md rounded-xl">
                <Booking />
            </div>
            <Outlet />
        </PageLayout>
    )
}
