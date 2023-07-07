import { Link } from "react-router-dom";

type NavButtonProps = {
    text: string;
    to: string
}

export function NavButton({ text, to }: NavButtonProps) {
    return (<Link to={to} className="text-lg border md:border-0 border-gray-400 w-full   hover:text-green-600">{text}</Link>
    )
}

type ButtonProps = {
    text: string;
    to?: string;
    type?: string
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
