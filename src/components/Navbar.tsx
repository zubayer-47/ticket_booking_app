import { useContext, useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { Link } from "react-router-dom";
import { Context } from '../contexts/Context';
import { NavButton } from "./Buttons/Button";

export default function Navbar() {
    const [menuBarOpen, setMenuBarOpen] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const ulRef = useRef<HTMLUListElement>(null);

    const { state, logout } = useContext(Context);

    useEffect(() => {
        const ul = ulRef.current;
        if (menuBarOpen) {

            ul?.classList.add('block')
            ul?.classList.remove('hidden')
        } else {
            ul?.classList.add('hidden')
            ul?.classList.remove('block')
        }
    }, [menuBarOpen])

    const handleClick = () => {
        setMenuBarOpen(prev => !prev);
    }

    return (
        <div className='bg-gray-50 w-full fixed top-0 left-0 right-0 px-2 md:px-5 py-3 md:py-4 border-b mb-10 select-none z-10'>
            <div className=" grid grid-cols-12 gap-2 max-w-6xl mx-auto">
                <Link to={'/'} className="col-span-2">BD Ticket</Link>
                <div className="col-span-10">
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
                                            {/* <li><NavButton to='/brand/create' text='Create Bus' /></li> */}
                                            <li><NavButton to='/brands' text='All Buses' /></li>
                                            <li><NavButton to='/product/create' text='Destinations' /></li>
                                            <li className='relative'><NavButton to='/product/create' text='Booking' />
                                                <span className='absolute -top-1.5 -right-4 py-0 px-0.5 bg-emerald-400 rounded-full text-xs'>12+</span>
                                            </li>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <li><NavButton to='/profile' text='Profile' /></li>
                                                <li><NavButton to='/order-history' text='Order History' /></li>
                                            </>
                                        )}

                                    {/* notification for admin */}

                                    <li className='relative'>
                                        <button type='button' onClick={() => setUserModal(prev => !prev)} ><FiUser className="text-3xl text-gray-50 rounded-full bg-emerald-500 cursor-pointer p-1" /></button>

                                        {userModal ? (
                                            <div className='absolute top-10 right-0 bg-gray-100 flex flex-col w-44 gap-2 text-gray-800 px-3 py-2 rounded-md shadow-md'>
                                                <NavButton handler={() => setUserModal(false)} to='/change-password' text='Change Password' />
                                                <NavButton isLogout handler={() => {
                                                    logout()
                                                    setUserModal(false)
                                                }} to='/' text='Sign Out' />
                                            </div>
                                        ) : null}
                                    </li>
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
