import Button from "./common/Button";

export default function Navbar() {
    return (
        <div className="grid grid-cols-12 gap-2 px-12 py-4">
            <div className="col-span-6">BD Ticket</div>
            <div className="col-span-6">
                <ul className="flex justify-end items-center gap-5">
                    <li><Button text="Admin" /></li>
                    <li><Button text="Sign In" /></li>
                    <li><Button text="Sign Up" /></li>
                    <li><Button text="Cancel Ticket" /></li>
                </ul>
            </div>
        </div>
    )
}
