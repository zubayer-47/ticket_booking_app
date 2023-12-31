/* eslint-disable @typescript-eslint/no-empty-function */
import { Link } from "react-router-dom";
import { ButtonHandler } from "../../types/custom";

type NavButtonProps = {
    text: string;
    to: string;
    handler?: () => void;
    isLogout?: boolean
    classNames?: string
}

export function NavButton({ text, to, handler = () => { }, classNames }: NavButtonProps) {
    return (<Link to={to} onClick={handler} className={`text-lg border md:border-0 border-gray-400 w-full hover:text-green-600 ${classNames || ""}`}>{text}</Link>
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
    handler?: ButtonHandler;
    red?: boolean;
    type?: "button" | "submit" | "reset";
    classNames?: string;
    bgNon?: boolean;
    isError?: boolean;
    props?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

export function MiniButton({ text, handler, red, type = 'button', classNames = "", isError, ...props }: MiniButtonProps) {

    return <button
        onClick={handler}
        type={type}
        className={`px-1 py-0.5 rounded-md ${red ? 'bg-red-400 text-white hover:bg-red-500' : "bg-emerald-400 text-white hover:bg-emerald-500"} ${classNames} ${isError ? "mb-6" : "mb-0"}`}
        {...props}
    >{text}</button>
}


type BgNoneButtonProps = {
    text: string;
    handler?: ButtonHandler;
    red?: boolean;
    type?: "button" | "submit" | "reset";
    classNames?: string;
    isError?: boolean
    disabled?: boolean
}

export function BgNoneButton({ text, handler, red, type = 'button', classNames = "", isError, disabled }: BgNoneButtonProps) {

    return <button
        disabled={disabled}
        onClick={handler}
        type={type}
        className={`px-1 py-0.5 rounded-md ${red ? 'text-red-400 hover:text-red-500' : "text-emerald-400 hover:text-emerald-500"} ${classNames} ${isError ? "mb-6" : "mb-0"}`}
    >{text}</button>
}
