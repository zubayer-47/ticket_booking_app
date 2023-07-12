import { useContext, useEffect, useRef, useState } from 'react';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { Link } from "react-router-dom";
import { Context } from '../contexts/Context';
import { NavButton } from "./Buttons/Button";

export default function Navbar() {
    const [barOpen, setOpen] = useState(false)
    const ulRef = useRef<HTMLUListElement>(null);

    const { state, logout } = useContext(Context);

    useEffect(() => {
        const ul = ulRef.current;
        if (barOpen) {

            ul?.classList.add('block')
            ul?.classList.remove('hidden')
        } else {
            ul?.classList.add('hidden')
            ul?.classList.remove('block')
        }
    }, [barOpen])

    const handleClick = () => {
        setOpen(prev => !prev);
    }

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 grid grid-cols-12 gap-2 px-2 md:px-5 py-3 md:py-4 border-b mb-10 select-none bg-gray-50 z-10">
                <Link to={'/'} className="col-span-6">BD Ticket</Link>
                <div className="col-span-6">
                    <div className=' flex justify-end w-full'>
                        <button onClick={handleClick} className='block md:hidden'><HiMiniBars3BottomRight className="h-8 w-8" /></button>
                    </div>
                    <div className='absolute top-14 left-0 right-0 bg-gray-200 md:bg-transparent md:relative md:top-0 '>
                        <ul ref={ulRef} className="w-full flex flex-col md:flex-row md:flex justify-end items-center gap-5 p-2 md:p-0">
                            {/* <li><NavButton to="/admin" text="Admin" /></li> */}
                            {state.user.authenticated ? (
                                <>
                                    {state.user.role === 'admin' ? (
                                        <>
                                            <li><NavButton to='/brand/create' text='Create Brand' /></li>
                                            <li><NavButton to='/product/create' text='Create Product' /></li>
                                            <li><NavButton to='/sign-in' text='SignIn' /></li>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <li><NavButton to='/profile' text='Profile' /></li>
                                                <li><NavButton to='/order-history' text='Order History' /></li>
                                            </>
                                        )}
                                    <li><NavButton to='/change-password' text='Change Password' /></li>
                                    <li><NavButton isLogout logout={logout} to='/' text='Sign Out' /></li>
                                </>
                            ) : (
                                <>
                                    <li><NavButton to="/sign-in" text="Sign In" /></li>
                                    <li><NavButton to="/sign-up" text="Sign Up" /></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div >
        </div>
    )
}
