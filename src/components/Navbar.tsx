
export default function Navbar() {
    return (
        <div className="grid grid-cols-12 gap-2 px-12">
            <div className="col-span-6">BD Ticket</div>
            <div className="col-span-6">
                <ul className="flex justify-end items-center gap-5">
                    <li>Admin</li>
                    <li>Sign In</li>
                    <li>Sign Up</li>
                    <li>Cancel Ticket</li>
                </ul>
            </div>
        </div>
    )
}
