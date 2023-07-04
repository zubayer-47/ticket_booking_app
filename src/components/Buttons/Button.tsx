
type ButtonProps = {
    text: string
}

export default function Button({ text }: ButtonProps) {
    return (<button className="hover:text-green-600">{text}</button>
    )
}
