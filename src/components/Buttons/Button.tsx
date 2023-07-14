/* eslint-disable @typescript-eslint/no-empty-function */
import { Link } from "react-router-dom";
import { ButtonHandler } from "../../types/custom";

type NavButtonProps = {
    text: string;
    to: string;
    logout?: () => void;
    isLogout?: boolean
}

export function NavButton({ text, to, logout = () => { }, isLogout = false }: NavButtonProps) {
    return (<Link to={to} onClick={() => {
        if (isLogout) {
            logout()
            // Cookies.remove("_token")
            localStorage.removeItem("_token")
        }
    }} className="text-lg border md:border-0 border-gray-400 w-full hover:text-green-600">{text}</Link>
    )
}

type ButtonProps = {
    text: string;
    to?: string;
    type?: string;
}

export function Button({ text, to = '/', type = '' }: ButtonProps) {
    return <Link type={type} to={to} className='py-2 px-4 rounded-md bg-emerald-500 text-white hover:bg-emerald-600'>{text}</Link>
}

type SubmitButtonProps = {
    text: string;
}

export function SubmitButton({ text }: SubmitButtonProps) {

    return <button type='submit' className='py-2 px-4 rounded-md bg-emerald-500 text-white hover:bg-emerald-600'>{text}</button>
}

type MiniButtonProps = {
    text: string;
    handler: ButtonHandler;
    red?: boolean;
    type?: "button" | "submit" | "reset";
    classNames?: string;
}

export function MiniButton({ text, handler, red, type = 'button', classNames = "" }: MiniButtonProps) {

    return <button
        onClick={handler}
        type={type}
        className={`px-1 py-0.5 rounded-md ${red ? 'bg-red-400 text-white hover:bg-red-500' : "bg-emerald-400 text-white hover:bg-emerald-500"} ${classNames}`}
    >{text}</button>
}
