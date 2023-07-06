import { Link } from "react-router-dom";
import { NavButton } from "./Buttons/Button";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 grid grid-cols-12 gap-2 px-12 py-4 border-b mb-10">
            <Link to={'/'} className="col-span-6">BD Ticket</Link>
            <div className="col-span-6">
                <ul className="flex justify-end items-center gap-5">
                    <li><NavButton to="/admin" text="Admin" /></li>
                    <li><NavButton to="/sign-in" text="Sign In" /></li>
                    <li><NavButton to="/sign-up" text="Sign Up" /></li>
                    <li><NavButton to="/cancel-ticket" text="Cancel Ticket" /></li>
                </ul>
            </div>
        </div>
    )
}
